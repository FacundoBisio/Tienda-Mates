// File: src/components/ProductCard.jsx
import React from "react";
import { AddToCartIcon } from "./Icons.jsx";
import { useCart } from '../context/Cart.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast(
      <div className="flex items-center gap-2 text-white font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
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
  const formattedPrice = isNaN(price) ? "$0.00" : `$${price.toFixed(2)}`;

  return (
    <div className="relative bg-orange-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 bg-white object-cover"
      />
      <div className="p-4 text-left">
        <h5 className="text-lg font-semibold">{product.name}</h5>
        <p className="text-orange-500 font-bold">{formattedPrice}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <button
          className="p-2 bg-orange-600 text-white rounded-full hover:bg-orange-800 transition-colors"
          onClick={handleAdd}
        >
          <AddToCartIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
