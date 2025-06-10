// src/context/Cart.jsx
import productsData from '../data/productsData';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importa toast para mostrar mensajes

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Al cargar, obtenemos productos con stock desde localStorage o data original
  const initialProducts = JSON.parse(localStorage.getItem('productos')) || productsData;
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  // Al cargar el componente, recupera el carrito del localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Al actualizar productos guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(allProducts));
  }, [allProducts]);

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Verificar stock y actualizar
    const updatedProducts = { ...allProducts };
    // Si categoría MATES, navegar dentro del objeto anidado
    const cat = product.category || product.catKey;
    const list = Array.isArray(updatedProducts[cat])
      ? updatedProducts[cat]
      : Object.values(updatedProducts[cat]).flat();
    const productInList = list.find(p => p.id === product.id);

    if (productInList && productInList.stock > 0) {
      productInList.stock--;
      setAllProducts(updatedProducts);
      // Agregar al carrito
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
      toast( // Reemplaza la alerta con el toast de error
        <div className="flex items-center gap-2 text-white font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 9.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12zm3 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12z"
              clipRule="evenodd"
            />
          </svg>
          No hay suficiente stock disponible para {product.name}
        </div>,
        {
          className: "rounded bg-red-600 text-white text-sm", // Cambié el color a rojo para error
          icon: false,
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    }
  };

  const removeFromCart = (id) => {
    const productToRemove = cartItems.find(item => item.id === id);
    if (productToRemove) {
      // Re增加 el stock al producto removido
      const updatedProducts = { ...allProducts };
      const cat = productToRemove.category || productToRemove.catKey;
      const list = Array.isArray(updatedProducts[cat])
        ? updatedProducts[cat]
        : Object.values(updatedProducts[cat]).flat();
      const productInList = list.find(p => p.id === productToRemove.id);
      if (productInList) {
        productInList.stock += productToRemove.quantity;
        setAllProducts(updatedProducts);
      }
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearCart = () => {
    // Reestablecer el stock de los productos al vaciar el carrito
    const updatedProducts = { ...allProducts };
    cartItems.forEach(item => {
      const cat = item.category || item.catKey;
      const list = Array.isArray(updatedProducts[cat])
        ? updatedProducts[cat]
        : Object.values(updatedProducts[cat]).flat();
      const productInList = list.find(p => p.id === item.id);
      if (productInList) {
        productInList.stock += item.quantity;
      }
    });
    setAllProducts(updatedProducts);
    setCartItems([]);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const diff = newQuantity - item.quantity;
          const updatedProducts = { ...allProducts };
          const cat = item.category || item.catKey;
          const list = Array.isArray(updatedProducts[cat])
            ? updatedProducts[cat]
            : Object.values(updatedProducts[cat]).flat();
          const productInList = list.find(p => p.id === id);

          if (productInList && productInList.stock >= diff) {
            productInList.stock -= diff;
            setAllProducts(updatedProducts);
            return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
          } else {
            alert(`No hay suficiente stock disponible para ${item.name}`);
            return item; // No actualizar la cantidad si no hay stock
          }
        }
        return item;
      });
    });
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartContext }; // **Exporta CartContext como nombrada**
export default CartProvider