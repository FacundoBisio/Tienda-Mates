'use client';

// src/context/Cart.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allProducts, setAllProducts] = useState<any>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndUpdateStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GOOGLE_SHEET_URL);
        if (!response.ok) throw new Error('Error conectando stock.');

        const csvText = await response.text();
        const stockMap = new Map<string, number>();
        csvText.trim().split('\n').slice(1).forEach(row => {
          const [id, , stock] = row.split(',');
          if (id && stock !== undefined) {
            stockMap.set(id.trim(), parseInt(stock.trim(), 10));
          }
        });

        const updatedData = structuredClone(productsData);

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

        setAllProducts(updateCategory(updatedData));
      } catch (error) {
        console.error('Error stock:', error);
        setAllProducts(productsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateStock();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findProduct = (data: any, id: string): Product | null => {
    for (const key in data) {
      if (Array.isArray(data[key])) {
        const found = data[key].find((p: Product) => p.id === id);
        if (found) return found;
      } else if (typeof data[key] === 'object') {
        const found = findProduct(data[key], id);
        if (found) return found;
      }
    }
    return null;
  };

  const addToCart = (product: Product) => {
    const productInStock = findProduct(allProducts, product.id);

    if (productInStock && productInStock.stock > 0) {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
      });

      setAllProducts((prev: unknown) => {
        const newData = structuredClone(prev);
        const itemToUpdate = findProduct(newData, product.id);
        if (itemToUpdate) itemToUpdate.stock = itemToUpdate.stock - 1;
        return newData;
      });
    } else {
      toast.error(`No hay suficiente stock disponible para ${product.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const removeFromCart = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setAllProducts((prev: unknown) => {
        const newData = structuredClone(prev);
        const itemToUpdate = findProduct(newData, id);
        if (itemToUpdate) itemToUpdate.stock += itemToRemove.quantity;
        return newData;
      });
    }
  };

  const clearCart = () => {
    setAllProducts((prev: unknown) => {
      const newData = structuredClone(prev);
      cartItems.forEach(cartItem => {
        const itemToUpdate = findProduct(newData, cartItem.id);
        if (itemToUpdate) itemToUpdate.stock += cartItem.quantity;
      });
      return newData;
    });
    setCartItems([]);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) { removeFromCart(id); return; }

    const itemInCart = cartItems.find(item => item.id === id);
    const productInStock = findProduct(allProducts, id);
    const currentQty = itemInCart ? itemInCart.quantity : 0;
    const diff = newQuantity - currentQty;

    if (diff < 0 || (productInStock && productInStock.stock >= diff)) {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
      setAllProducts((prev: unknown) => {
        const newData = structuredClone(prev);
        const itemToUpdate = findProduct(newData, id);
        if (itemToUpdate) itemToUpdate.stock -= diff;
        return newData;
      });
    } else {
      toast.warn(`Solo quedan ${productInStock?.stock} unidades.`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, allProducts, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
