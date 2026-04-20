'use client';

// src/context/Cart.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import type { Product, CartItem, CartContextValue } from '@/types';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

// ─── helpers ────────────────────────────────────────────────────
// Build a flat id → { path, product } index for O(1) lookups
type ProductIndex = Map<string, { catKey: string; subKey?: string; idx: number }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildIndex = (data: any): ProductIndex => {
  const index: ProductIndex = new Map();
  for (const catKey in data) {
    const cat = data[catKey];
    if (Array.isArray(cat)) {
      cat.forEach((p: Product, idx: number) => {
        if (!index.has(p.id)) index.set(p.id, { catKey, idx });
      });
    } else if (typeof cat === 'object' && cat !== null) {
      for (const subKey in cat) {
        const sub = cat[subKey];
        if (Array.isArray(sub)) {
          sub.forEach((p: Product, idx: number) => {
            if (!index.has(p.id)) index.set(p.id, { catKey, subKey, idx });
          });
        }
      }
    }
  }
  return index;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findProductFast = (data: any, index: ProductIndex, id: string): Product | null => {
  const loc = index.get(id);
  if (!loc) return null;
  if (loc.subKey !== undefined) {
    return data[loc.catKey]?.[loc.subKey]?.[loc.idx] ?? null;
  }
  return data[loc.catKey]?.[loc.idx] ?? null;
};

// Immutable stock update – only recreates the affected array + branch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateStockImmutable = (data: any, index: ProductIndex, id: string, delta: number): any => {
  const loc = index.get(id);
  if (!loc) return data;

  if (loc.subKey !== undefined) {
    const oldArr = data[loc.catKey][loc.subKey];
    const newArr = [...oldArr];
    newArr[loc.idx] = { ...newArr[loc.idx], stock: newArr[loc.idx].stock + delta };
    return {
      ...data,
      [loc.catKey]: {
        ...data[loc.catKey],
        [loc.subKey]: newArr,
      },
    };
  }

  const oldArr = data[loc.catKey];
  const newArr = [...oldArr];
  newArr[loc.idx] = { ...newArr[loc.idx], stock: newArr[loc.idx].stock + delta };
  return { ...data, [loc.catKey]: newArr };
};

// ─── Provider ───────────────────────────────────────────────────
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allProducts, setAllProducts] = useState<any>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized product index – rebuilds only when allProducts object changes
  const productIndex = useMemo(() => buildIndex(allProducts), [allProducts]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setAllProducts(data))
      .catch(err => { if (err?.name !== 'AbortError') console.error('Error cargando productos:', err); })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    const productInStock = findProductFast(allProducts, productIndex, product.id);

    if (!productInStock || productInStock.stock <= 0) {
      toast.error(`No hay suficiente stock disponible para ${product.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    setCartItems(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setAllProducts((prev: unknown) => {
      const idx = buildIndex(prev);
      return updateStockImmutable(prev, idx, product.id, -1);
    });
  }, [allProducts, productIndex]);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) {
        setAllProducts((prevProducts: unknown) => {
          const idx = buildIndex(prevProducts);
          return updateStockImmutable(prevProducts, idx, id, itemToRemove.quantity);
        });
        return prev.filter(item => item.id !== id);
      }
      return prev;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems(prev => {
      if (prev.length > 0) {
        setAllProducts((prevProducts: unknown) => {
          let data = prevProducts;
          const idx = buildIndex(data);
          for (const cartItem of prev) {
            data = updateStockImmutable(data, idx, cartItem.id, cartItem.quantity);
          }
          return data;
        });
      }
      return [];
    });
  }, []);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) { removeFromCart(id); return; }

    setCartItems(prev => {
      const itemInCart = prev.find(item => item.id === id);
      const currentQty = itemInCart ? itemInCart.quantity : 0;
      const diff = newQuantity - currentQty;

      setAllProducts((prevProducts: unknown) => {
        const idx = buildIndex(prevProducts);
        const productInStock = findProductFast(prevProducts, idx, id);
        if (diff < 0 || (productInStock && productInStock.stock >= diff)) {
          return updateStockImmutable(prevProducts, idx, id, -diff);
        }
        toast.warn(`Solo quedan ${productInStock?.stock} unidades.`);
        return prevProducts;
      });

      // Check if the update is valid
      return prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
    });
  }, [removeFromCart]);

  const contextValue = useMemo<CartContextValue>(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    allProducts,
    isLoading,
  }), [cartItems, addToCart, removeFromCart, clearCart, updateQuantity, allProducts, isLoading]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;

