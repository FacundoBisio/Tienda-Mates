// src/components/CartSidebar.jsx
import React, { useEffect } from 'react';
import { useCart } from '../context/Cart';
import { MateIcon } from './Icons';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);

  const generarMensajeWhatsApp = () => {
    const mensaje = cartItems
      .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-AR')}`)
      .join('\n');
    const url = `https://wa.me/5493513662570?text=${encodeURIComponent(
      `Hola! Quiero hacer el siguiente pedido:\n\n${mensaje}\n\nTotal: $${total.toLocaleString('es-AR')}`
    )}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#FAFAF8] z-50 transform transition-transform duration-400 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#E8E3DC]">
          <h3 className="text-base font-medium text-[#1C1C1C] tracking-wide">
            Carrito {cartItems.length > 0 && <span className="text-[#888] font-normal">({cartItems.length})</span>}
          </h3>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#1C1C1C] transition-colors text-xl leading-none"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-6 gap-4">
            <MateIcon className="w-12 h-12 text-[#4C674A]" />
            <p className="text-[#888] text-sm">Tu carrito está vacío</p>
            <button onClick={onClose} className="text-xs tracking-widest uppercase text-[#4C674A] hover:underline mt-2">
              Seguir comprando →
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-grow overflow-y-auto px-6 py-4 space-y-5">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 items-start">
                  {/* Imagen */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#4C674A]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  {/* Info */}
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-[#1C1C1C] leading-snug">{item.name}</p>
                    <p className="text-xs text-[#888] mt-0.5">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                    {/* Qty */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-[#E8E3DC] flex items-center justify-center text-sm text-[#1C1C1C] hover:border-[#4C674A] transition-colors"
                      >−</button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-[#E8E3DC] flex items-center justify-center text-sm text-[#1C1C1C] hover:border-[#4C674A] transition-colors"
                      >+</button>
                    </div>
                  </div>
                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#BBBBB0] hover:text-red-400 transition-colors text-sm mt-1 flex-shrink-0"
                    aria-label="Eliminar"
                  >✕</button>
                </li>
              ))}
            </ul>

            {/* Footer del carrito */}
            <div className="px-6 py-6 border-t border-[#E8E3DC] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#888]">Total</span>
                <span className="text-lg font-semibold text-[#1C1C1C]">${total.toLocaleString('es-AR')}</span>
              </div>

              <button
                onClick={generarMensajeWhatsApp}
                className="w-full bg-[#1C1C1C] text-white py-3.5 rounded-xl text-sm font-medium tracking-wide hover:bg-[#4C674A] transition-colors active:scale-[0.98]"
              >
                Finalizar por WhatsApp →
              </button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-[#888] hover:text-red-400 transition-colors tracking-widest uppercase py-1"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
