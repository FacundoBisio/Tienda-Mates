// src/context/Cart.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import productsData from '../data/productsData'; 

const GOOGLE_SHEET_URL = import.meta.env?.VITE_GOOGLE_SHEET_URL || `https://docs.google.com/spreadsheets/d/e/2PACX-1vSAay1X8MYjlrX4_YJpKz-ieLNhBJGMcCi40BTTMhjo7XADQ5wAybhbkqiE7RoMKutMGd_zfpPlzgMf/pub?gid=1640561616&single=true&output=csv&_t=${new Date().getTime()}`;

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Carga Inicial ---
  useEffect(() => {
    const fetchAndUpdateStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GOOGLE_SHEET_URL);
        if (!response.ok) throw new Error('Error conectando stock.');
        
        const csvText = await response.text();
        const stockMap = new Map();
        csvText.trim().split('\n').slice(1).forEach(row => {
          const [id, name, stock] = row.split(',');
          if (id && stock !== undefined) {
            stockMap.set(id.trim(), parseInt(stock.trim(), 10));
          }
        });

        // Clonado eficiente
        const updatedData = structuredClone(productsData);

        // Helper recursivo para actualizar stock inicial
        const updateCategory = (items) => {
          if (Array.isArray(items)) {
            return items.map(item => ({
              ...item,
              stock: stockMap.has(String(item.id)) ? stockMap.get(String(item.id)) : item.stock
            }));
          } else if (typeof items === 'object' && items !== null) {
            const newObj = {};
            Object.keys(items).forEach(key => {
              newObj[key] = updateCategory(items[key]);
            });
            return newObj;
          }
          return items;
        };

        const finalProducts = updateCategory(updatedData);
        setAllProducts(finalProducts);

      } catch (error) {
        console.error("Error stock:", error);
        setAllProducts(productsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateStock();
  }, []);

  // --- Persistencia ---
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Helper de Búsqueda ---
  const findProduct = (data, id) => {
    for (const key in data) {
      if (Array.isArray(data[key])) {
        const found = data[key].find(p => p.id === id);
        if (found) return found;
      } else if (typeof data[key] === 'object') {
        const found = findProduct(data[key], id);
        if (found) return found;
      }
    }
    return null;
  };

  // --- Funciones del Carrito ---

  const addToCart = (product) => {
    const productInStock = findProduct(allProducts, product.id);
    const currentInCart = cartItems.find(item => item.id === product.id);
    const quantityInCart = currentInCart ? currentInCart.quantity : 0;

    if (productInStock && (productInStock.stock > 0)) {
      // 1. Agregar al carrito
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });

      // 2. ACTUALIZACIÓN VISUAL DEL STOCK (Esto es lo que faltaba para que "baje")
      setAllProducts(prev => {
        const newData = structuredClone(prev); // Usamos structuredClone que es nativo y seguro
        const itemToUpdate = findProduct(newData, product.id);
        if (itemToUpdate) {
            itemToUpdate.stock = itemToUpdate.stock - 1; // Restamos visualmente
        }
        return newData;
      });

    } else {
      toast.error(`No hay suficiente stock disponible para ${product.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };
  
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if(itemToRemove) {
        setCartItems(prev => prev.filter(item => item.id !== id));
        
        // Devolvemos el stock visualmente
        setAllProducts(prev => {
            const newData = structuredClone(prev);
            const itemToUpdate = findProduct(newData, id);
            if (itemToUpdate) itemToUpdate.stock += itemToRemove.quantity;
            return newData;
        });
    }
  };

  const clearCart = () => {
    // Devolvemos todo el stock visualmente antes de limpiar
    setAllProducts(prev => {
        const newData = structuredClone(prev);
        cartItems.forEach(cartItem => {
            const itemToUpdate = findProduct(newData, cartItem.id);
            if (itemToUpdate) itemToUpdate.stock += cartItem.quantity;
        });
        return newData;
    });
    setCartItems([]);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const itemInCart = cartItems.find(item => item.id === id);
    const productInStock = findProduct(allProducts, id);
    
    // Calculamos la diferencia
    const currentQty = itemInCart ? itemInCart.quantity : 0;
    const diff = newQuantity - currentQty; 

    // Si queremos agregar (diff > 0), revisamos si hay stock REMANENTE en allProducts
    // Si queremos restar (diff < 0), siempre se puede
    if (diff < 0 || (productInStock && productInStock.stock >= diff)) {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
      
      // Actualizamos stock visual
      setAllProducts(prev => {
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
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        allProducts,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext }; 
export default CartProvider;