'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/context/Cart';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import AnnouncementBar from './AnnouncementBar';

// Lazy-load heavy components not needed for the initial paint
const CartSidebar    = dynamic(() => import('./CartSidebar'),   { ssr: false });
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });
const Footer         = dynamic(() => import('./Footer'),        { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
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
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        style={{ top: '88px', zIndex: 99999 }}
        toastStyle={{ borderRadius: '12px' }}
      />
    </CartProvider>
  );
}
