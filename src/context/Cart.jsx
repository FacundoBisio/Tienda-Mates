// src/context/Cart.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import productsData from '../data/productsData'; 

const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSAay1X8MYjlrX4_YJpKz-ieLNhBJGMcCi40BTTMhjo7XADQ5wAybhbkqiE7RoMKutMGd_zfpPlzgMf/pub?gid=1640561616&single=true&output=csv&_t=${new Date().getTime()}`;

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// --- Función Auxiliar para la lógica de actualización ---
// Esta función recorre tu objeto de productos anidado y actualiza el stock
const updateStockInData = (data, stockMap) => {
  const updatedData = JSON.parse(JSON.stringify(data)); // Copia profunda para no mutar el original

  Object.keys(updatedData).forEach(categoryKey => {
    const category = updatedData[categoryKey];
    if (Array.isArray(category)) { // Caso: TERMOS, YERBAS, etc.
      category.forEach(product => {
        // Usa product.id.toString() para asegurar consistencia si los IDs son números en tu JSON y strings en la hoja.
        if (stockMap.has(product.id.toString())) {
          product.stock = stockMap.get(product.id.toString());
        }
      });
    } else if (typeof category === 'object' && category !== null) { // Caso: MATES
      Object.keys(category).forEach(subCategoryKey => {
        const subCategory = category[subCategoryKey];
        if (Array.isArray(subCategory)) {
          subCategory.forEach(product => {
            // Usa product.id.toString()
            if (stockMap.has(product.id.toString())) {
              product.stock = stockMap.get(product.id.toString());
            }
          });
        }
      });
    }
  });
  return updatedData;
};


export const CartProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar el stock desde Google Sheets al iniciar
useEffect(() => {
  const fetchAndUpdateStock = async () => {
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      if (!response.ok) {
        throw new Error('No se pudo conectar con la base de datos de stock.');
      }
      const csvText = await response.text();

      const stockMap = new Map();
      const rows = csvText.trim().split('\n').slice(1); // Omitimos la cabecera
      rows.forEach(row => {
        const [id, name, stock] = row.split(',');
        if (id && stock !== undefined) {
          stockMap.set(id.trim(), parseInt(stock.trim(), 10));
        }
      });

      // Función para actualizar el stock en productsData
      const updateStockInData = (data, stockMap) => {
        const updatedData = {};

        Object.entries(data).forEach(([category, items]) => {
          if (Array.isArray(items)) {
            // Categoría plana como TERMOS, YERBAS, etc.
            updatedData[category] = items.map(item => ({
              ...item,
              stock: stockMap.has(item.id) ? stockMap.get(item.id) : item.stock
            }));
          } else {
            // Subcategorías como MATES -> Camioneros, Imperiales, etc.
            updatedData[category] = {};
            Object.entries(items).forEach(([subCategory, subItems]) => {
              updatedData[category][subCategory] = subItems.map(item => ({
                ...item,
                stock: stockMap.has(item.id) ? stockMap.get(item.id) : item.stock
              }));
            });
          }
        });

        return updatedData;
      };

      const updatedProducts = updateStockInData(productsData, stockMap);
      setAllProducts(updatedProducts);

    } catch (error) {
      console.error("Error al cargar el stock desde Google Sheets:", error);
      toast.error("Hubo un error al cargar el stock. Se usarán datos locales.", { autoClose: 3000 });
      setAllProducts(productsData);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAndUpdateStock();
}, []);

const findProductAndUpdateInMemory = (productsData, productId, action) => {
  for (const categoryKey in productsData) {
    const category = productsData[categoryKey];
    if (Array.isArray(category)) {
      const product = category.find(p => p.id === productId);
      if (product) {
        action(product);
        return;
      }
    } else if (typeof category === 'object' && category !== null) {
      for (const subCategoryKey in category) {
        const subCategory = category[subCategoryKey];
        const product = subCategory.find(p => p.id === productId);
        if (product) {
          action(product);
          return;
        }
      }
    }
  }
};


  // Al cargar el componente, recupera el carrito del localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Guarda allProducts y cartItems en localStorage cada vez que cambian
  useEffect(() => {
    // Solo guardar si no estamos en la fase de carga inicial
    // y si allProducts ya ha sido poblado (no es un objeto vacío inicial)
    if (!isLoading && Object.keys(allProducts).length > 0) {
      localStorage.setItem('productos', JSON.stringify(allProducts));
    }
  }, [allProducts, isLoading]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para encontrar un producto en la estructura de datos anidada
  const findProductAndUpdate = (productId, action) => {
    const updatedProducts = JSON.parse(JSON.stringify(allProducts));
    let productFound = null;

    for (const categoryKey in updatedProducts) {
      const category = updatedProducts[categoryKey];
      if (Array.isArray(category)) {
        const product = category.find(p => p.id === productId);
        if (product) {
          action(product);
          productFound = product;
          break;
        }
      } else if (typeof category === 'object' && category !== null) {
        for (const subCategoryKey in category) {
          const subCategory = category[subCategoryKey];
          const product = subCategory.find(p => p.id === productId);
          if (product) {
            action(product);
            productFound = product;
            break;
          }
        }
      }
      if (productFound) break;
    }
    
    if (productFound) {
      setAllProducts(updatedProducts);
    }
    return productFound;
  };

  const addToCart = (product) => {
    let stockSuficiente = false;
    findProductAndUpdate(product.id, (p) => {
      if (p.stock > 0) {
        p.stock--;
        stockSuficiente = true;
      }
    });

    if (stockSuficiente) {
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
    } else {
      toast(
        <div className="flex items-center gap-2 text-white font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 9.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12z" clipRule="evenodd" /></svg>
          No hay suficiente stock disponible para {product.name}
        </div>,
        { className: "rounded bg-red-600 text-white text-sm", icon: false, autoClose: 2000, hideProgressBar: true, closeButton: false }
      );
    }
  };
  
  const removeFromCart = (id) => {
    const productToRemove = cartItems.find(item => item.id === id);
    if (productToRemove) {
      findProductAndUpdate(id, p => {
        p.stock += productToRemove.quantity;
      });
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearCart = () => {
    cartItems.forEach(item => {
      findProductAndUpdate(item.id, p => {
        p.stock += item.quantity;
      });
    });
    setCartItems([]);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const itemInCart = cartItems.find(item => item.id === id);
    if (!itemInCart) return;

    const diff = newQuantity - itemInCart.quantity;
    let stockSuficiente = false;
    
    // Obtener el producto actual antes de intentar actualizar el stock
    let productInStore = null; 
    findProductAndUpdate(id, p => {
      productInStore = p; // Asignar el producto encontrado a la variable
      if (p.stock >= diff) {
        p.stock -= diff;
        stockSuficiente = true;
      }
    });

    if (stockSuficiente && productInStore) {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } else {
        // Si no hay stock, revertimos el cambio visualmente
        // Asegurarse de que el producto existe antes de intentar revertir el stock.
        if (productInStore) { 
          findProductAndUpdate(id, p => { p.stock += diff; });
        }
        alert(`No hay suficiente stock para agregar más ${itemInCart.name}`);
    }
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFDE45]">
        <div className="flex flex-col items-center">
          <p className="py-5 text-2xl font-bold text-[#692904]">Cargando productos...</p>
          {/* Aquí es donde se elimina el atributo 'jsx' */}
          <div className="loader"></div>
        </div>
        <style>{`
          .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #692904; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        allProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartContext }; 
export default CartProvider;