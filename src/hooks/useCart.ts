// File: src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '@/context/Cart';
import type { CartContextValue } from '@/types';

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
