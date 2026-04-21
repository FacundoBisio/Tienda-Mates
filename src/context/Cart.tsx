'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import type { Product, CartItem, CartContextValue } from '@/types';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allProducts, setAllProducts] = useState<any>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Derives available stock from server data minus what's already in cart.
  // allProducts never mutated by cart ops → no unnecessary re-renders.
  const getAvailableStock = useCallback((id: string): number => {
    const product = findProductFast(allProducts, productIndex, id);
    if (!product) return 0;
    const inCart = cartItems.find(i => i.id === id)?.quantity ?? 0;
    return product.stock - inCart;
  }, [allProducts, productIndex, cartItems]);

  const addToCart = useCallback((product: Product) => {
    const available = getAvailableStock(product.id);
    if (available <= 0) {
      toast.error(`No hay suficiente stock disponible para ${product.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [getAvailableStock]);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) { removeFromCart(id); return; }
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const product = findProductFast(allProducts, productIndex, id);
      if (product && newQuantity > product.stock) {
        toast.warn(`Solo quedan ${product.stock} unidades.`);
        return prev;
      }
      return prev.map(i => i.id === id ? { ...i, quantity: newQuantity } : i);
    });
  }, [allProducts, productIndex, removeFromCart]);

  const contextValue = useMemo<CartContextValue>(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    allProducts,
    isLoading,
    getAvailableStock,
  }), [cartItems, addToCart, removeFromCart, clearCart, updateQuantity, allProducts, isLoading, getAvailableStock]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
