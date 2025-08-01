// src/components/CartSidebar.jsx
import React, { useEffect } from 'react';
import { useCart } from '../context/Cart';
import { ClearCartIcon } from './Icons.jsx';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  const generarMensajeWhatsApp = () => {
    const mensaje = cartItems
      .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const totalTexto = `\n\nTotal: $${total.toFixed(2)}`;
    const url = `https://wa.me/5493513662570?text=${encodeURIComponent(
      `Hola, quiero hacer el siguiente pedido:\n${mensaje}${totalTexto}`
    )}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>
    )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#692904] text-white rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Carrito de compras</h3>
            <button
              onClick={onClose}
              className="text-2xl font-bold leading-none hover:text-red-500"
            >
              &times;
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-200 flex-grow">Tu carrito está vacío</p>
          ) : (
            <>
            <ul className="flex-grow overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="mb-4 flex items-center border-b pb-4 gap-4"
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Info del producto */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {/* Si tu producto tiene talla o algo adicional lo podés agregar acá */}
                        {/* <p className="text-xs text-gray-300">(S)</p> */}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        <ClearCartIcon />
                      </button>
                    </div>

                    {/* Precio */}
                    <p className="text-sm font-bold mt-2 text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Botones de cantidad */}
                    <div className="flex items-center mt-2 bg-white rounded-full w-fit px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-black text-lg font-bold px-2"
                      >
                        -
                      </button>
                      <span className="text-black px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-black text-lg font-bold px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>


              <div className="mt-4">
                <div className="font-semibold mb-2 text-lg">
                  Total: ${total.toFixed(2)}
                </div>
                <button
                  onClick={generarMensajeWhatsApp}
                  className="btn btn-outline-success font-semibold w-full mb-2 px-4 py-2 rounded text-sm"
                >
                  Finalizar compra por WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="btn btn-outline-secondary w-full px-4 py-2 rounded font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <ClearCartIcon />
                  Limpiar carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
