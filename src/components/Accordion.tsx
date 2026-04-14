'use client';

// src/components/Accordion.tsx
import React, { useState } from 'react';

const items = [
  {
    title: '¿Hacen envíos a todo el país?',
    content: 'Sí, realizamos envíos a todo el territorio argentino. Coordinamos el costo y la logística directamente por WhatsApp antes de confirmar tu pedido.',
  },
  {
    title: '¿Los mates vienen curados?',
    content: 'La mayoría de nuestros mates de calabaza requieren un proceso de curado. Incluimos un instructivo paso a paso con tu compra. El proceso es simple: llenalo con yerba usada, dejalo 24 hs y repetí 2-3 veces.',
  },
  {
    title: '¿Qué medios de pago aceptan?',
    content: 'Aceptamos transferencias bancarias, efectivo y efectivo digital. Todo se coordina directamente por WhatsApp para garantizar una compra segura y personalizada.',
  },
  {
    title: '¿Cómo curar el mate de calabaza?',
    content: 'Llenalo con yerba usada y agua caliente (no hirviendo), dejalo reposar 24 hs, vacialo y raspá suavemente el interior con una cucharita. Repetí el proceso 2 o 3 veces. Es fundamental para evitar grietas y que el mate tome buen sabor.',
  },
  {
    title: '¿Tienen garantía los productos?',
    content: 'Sí, todos nuestros productos cuentan con garantía por defectos de fabricación. Si tenés algún inconveniente dentro de los 30 días de recibido, contactanos por WhatsApp y lo resolvemos sin problema.',
  },
  {
    title: '¿Puedo pedir un mate personalizado?',
    content: 'Por supuesto. Consultanos por WhatsApp con tu idea y trabajamos juntos para crear algo único. Ideal para regalos especiales, cumpleaños o eventos corporativos.',
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
              isOpen ? 'border-[#4C674A]/40 shadow-sm' : 'border-[#E8E3DC]'
            } bg-white`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors hover:bg-[#f8f6f2]"
            >
              <span className={`text-sm font-medium leading-snug pr-4 transition-colors ${isOpen ? 'text-[#3C503A]' : 'text-[#1C1C1C]'}`}>
                {item.title}
              </span>
              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#4C674A] text-white rotate-180' : 'bg-[#F0EDE8] text-[#888]'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="px-6 pb-5 text-sm text-[#666] leading-relaxed border-t border-[#F0EDE8] pt-4">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
