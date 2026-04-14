'use client';

// src/context/Cart.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import productsData from '../data/productsData';
import type { Product, CartItem, CartContextValue } from '@/types';

const GOOGLE_SHEET_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ??
  `https://docs.google.com/spreadsheets/d/e/2PACX-1vSAay1X8MYjlrX4_YJpKz-ieLNhBJGMcCi40BTTMhjo7XADQ5wAybhbkqiE7RoMKutMGd_zfpPlzgMf/pub?gid=1640561616&single=true&output=csv&_t=${new Date().getTime()}`;

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
  const [allProducts, setAllProducts] = useState<any>(productsData);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized product index – rebuilds only when allProducts object changes
  const productIndex = useMemo(() => buildIndex(allProducts), [allProducts]);

  useEffect(() => {
    // Fetch stock updates in the background – don't block initial render
    const controller = new AbortController();
    const fetchAndUpdateStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GOOGLE_SHEET_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Error conectando stock.');

        const csvText = await response.text();
        const stockMap = new Map<string, number>();
        csvText.trim().split('\n').slice(1).forEach(row => {
          const [id, , stock] = row.split(',');
          if (id && stock !== undefined) {
            stockMap.set(id.trim(), parseInt(stock.trim(), 10));
          }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateCategory = (items: any): any => {
          if (Array.isArray(items)) {
            return items.map(item => ({
              ...item,
              stock: stockMap.has(String(item.id)) ? stockMap.get(String(item.id)) : item.stock,
            }));
          } else if (typeof items === 'object' && items !== null) {
            const newObj: Record<string, unknown> = {};
            Object.keys(items).forEach(key => { newObj[key] = updateCategory(items[key]); });
            return newObj;
          }
          return items;
        };

        setAllProducts(updateCategory(structuredClone(productsData)));
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error stock:', error);
        }
        // allProducts already has productsData, no need to set it again
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateStock();
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

