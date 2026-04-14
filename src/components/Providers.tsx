'use client';

import { useState } from 'react';
import { CartProvider } from '@/context/Cart';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import AnnouncementBar from './AnnouncementBar';
import CartSidebar from './CartSidebar';
import WhatsAppButton from './WhatsAppButton';
import Footer from './Footer';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <ToastContainer
        position="top-right"
        style={{ top: '88px', zIndex: 9999 }}
        toastStyle={{ borderRadius: '12px' }}
      />

      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header onCartOpen={() => setCartOpen(true)} />
      </div>

      <div className="bg-[#FAFAF8] text-[#1C1C1C] relative">
        {children}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <WhatsAppButton />
      <Footer />
    </CartProvider>
  );
}
