// src/context/Cart.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import productsData from '../data/productsData'; 

// BUENA PRÁCTICA: Usar variable de entorno si existe, sino fallback
const GOOGLE_SHEET_URL = import.meta.env?.VITE_GOOGLE_SHEET_URL || `https://docs.google.com/spreadsheets/d/e/2PACX-1vSAay1X8MYjlrX4_YJpKz-ieLNhBJGMcCi40BTTMhjo7XADQ5wAybhbkqiE7RoMKutMGd_zfpPlzgMf/pub?gid=1640561616&single=true&output=csv&_t=${new Date().getTime()}`;

// 1. Crear el contexto
const CartContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// 3. Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState({}); // Inicialmente vacío
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Efecto para cargar el stock desde Google Sheets ---
  useEffect(() => {
    const fetchAndUpdateStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GOOGLE_SHEET_URL);
        if (!response.ok) throw new Error('Error conectando con la hoja de stock.');
        
        const csvText = await response.text();
        const stockMap = new Map();
        
        // Parseo simple de CSV (omitiendo cabecera)
        csvText.trim().split('\n').slice(1).forEach(row => {
          const [id, name, stock] = row.split(',');
          // Aseguramos que id y stock existan antes de guardar
          if (id && stock !== undefined) {
            stockMap.set(id.trim(), parseInt(stock.trim(), 10));
          }
        });

        // OPTIMIZACIÓN: structuredClone es nativo y más rápido que JSON.parse/stringify
        const updatedData = structuredClone(productsData);

        // Lógica de actualización recursiva para recorrer categorías y subcategorías
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
        console.error("Error al cargar el stock:", error);
        toast.error("Hubo un error al cargar el stock. Se usarán datos locales.", { autoClose: 3000 });
        setAllProducts(productsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateStock();
  }, []);

  // --- Persistencia del carrito en localStorage ---
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Helper recursivo para buscar producto en la estructura anidada ---
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
    // Verificamos stock contra el estado actual 'allProducts' (memoria)
    const productInStock = findProduct(allProducts, product.id);
    const currentInCart = cartItems.find(item => item.id === product.id);
    const quantityInCart = currentInCart ? currentInCart.quantity : 0;

    // Si hay stock disponible (stock real - lo que ya tengo en el carrito)
    if (productInStock && (productInStock.stock - quantityInCart) > 0) {
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
      // Nota: No mostramos toast aquí porque ya lo haces en ProductCard.jsx
    } else {
      toast.error(`No hay suficiente stock disponible para ${product.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };
  
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const productInStock = findProduct(allProducts, id);
    
    // Verificamos si hay stock suficiente para la NUEVA cantidad total deseada
    if (productInStock && productInStock.stock >= newQuantity) {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } else {
      toast.warn(`Solo hay ${productInStock?.stock || 0} unidades disponibles de este producto.`);
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
        allProducts, // Data completa con stock actualizado
        isLoading,   // Estado de carga para usar en la UI
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4. Exportaciones finales
export { CartContext }; 
export default CartProvider;