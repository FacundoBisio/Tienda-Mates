'use client';

// src/components/AnnouncementBar.tsx
import React, { useState, useEffect } from 'react';

const IconTruck = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const IconCraft = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const IconChat = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const IconShield = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const messages = [
  { Icon: IconTruck,  text: 'Envíos gratis a partir de $100.000 · Embalaje seguro garantizado' },
  { Icon: IconCraft,  text: 'Piezas únicas hechas a mano · Calidad artesanal en cada detalle' },
  { Icon: IconChat,   text: 'Atención personalizada por WhatsApp · Respondemos al instante' },
  { Icon: IconShield, text: 'Compra 100% segura · Coordinamos pago y entrega por WhatsApp' },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % messages.length);
        setVisible(true);
      }, 350);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const { Icon, text } = messages[current];

  return (
    <div
      className="relative w-full bg-[#ECEAE5] text-[#3C503A] text-center py-2 px-4 flex items-center justify-center gap-2 overflow-hidden border-b border-[#DDD9D2]"
      style={{ minHeight: '36px' }}
    >
      <span
        className="text-[11.5px] tracking-[0.1em] font-medium flex items-center gap-2 transition-all duration-300"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-5px)' }}
      >
        <Icon />
        <span>{text}</span>
      </span>

      <div className="absolute right-4 hidden sm:flex items-center gap-1">
        {messages.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setVisible(true); }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? '#4C674A' : '#C5BFB3' }}
            aria-label={`Mensaje ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
