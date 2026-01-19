import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App'
import './index.css'
import { CartProvider } from './context/Cart';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HelmetProvider>
  </BrowserRouter>
);
