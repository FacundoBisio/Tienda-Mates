// src/components/ProductCard.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { Add } from "./Icons.jsx";
import { useCart } from '../context/Cart.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    addToCart({ ...product, category: product.category || Object.keys(product).find(key => Array.isArray(product[key])) });
    toast(
      <div className="flex items-center gap-2 text-white font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        {product.name} agregado al carrito
      </div>,
      {
        className: "rounded bg-yellow-600 text-xs text-[#2ec946]",
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };

  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? "$0" : `$${Number.isInteger(price) ? price : price.toFixed(2)}`;

  return (
    <div className="group relative bg-yellow-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      
      {/* 1. IMAGEN: El zoom ahora solo ocurre en desktop (md:) */}
      <Link to={`/producto/${product.href || product.id}`} className="block h-56 overflow-hidden relative shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full bg-white object-cover transition-transform duration-500 md:group-hover:scale-110"
        />
      </Link>

      {/* 2. INFORMACIÓN DEL PRODUCTO */}
      <div className="p-4 text-left flex flex-col flex-grow relative z-10">
        <Link to={`/producto/${product.href || product.id}`} className="block mb-2">
            <h5 className="text-[#2E1300] text-lg font-semibold leading-tight hover:underline">
            {product.name}
            </h5>
        </Link>

        {/* Precio y Stock */}
        <div className="mt-auto">
            <p className="text-[#2E1300] font-bold text-lg">{formattedPrice}</p>
            <p className="text-xs text-gray-600 mt-1">Stock: {product.stock}</p>
        </div>
      </div>

      {/* 3. BOTÓN FLOTANTE */}
      <div className="absolute bottom-2 right-2 z-20">
        <button
          disabled={product.stock <= 0}
          className={`${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-orange-800 hover:animate-spin shadow-none hover:shadow-lg cursor-pointer'} rounded-full transition duration-700`}
          onClick={handleAdd}
        >
          <Add />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;