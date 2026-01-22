// components/Accordion.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const items = [
  {
    title: '¿Hacen envíos a todo el país?',
    content: 'Sí, realizamos envíos a todo el territorio argentino. Podés calcular el costo exacto ingresando tu código postal en el carrito de compras antes de finalizar tu pedido.',
  },
  {
    title: '¿Los mates vienen curados?',
    content: 'La mayoría de nuestros mates de calabaza requieren un proceso de curado. Incluimos un instructivo paso a paso con tu compra, o podés consultar nuestra guía rápida aquí mismo sobre "Cómo curar el mate".',
  },
  {
    title: '¿Qué medios de pago aceptan?',
    content: 'Aceptamos todas las tarjetas de crédito y débito, transferencias bancarias y efectivo. Trabajamos con plataformas seguras para garantizar tu tranquilidad al comprar.',
  },
  {
    title: '¿Cómo curar el mate?',
    content: 'Para curar tu mate de calabaza: llenalo con yerba usada y agua caliente (no hirviendo), dejalo reposar 24hs, vacialo y raspá el interior con una cuchara. Repetí 2 o 3 veces. Fundamental para evitar grietas y moho.',
  },
  {
    title: '¿Tienen garantía los productos?',
    content: 'Sí, todos nuestros productos cuentan con garantía por defectos de fabricación. Si tenés algún inconveniente, contactanos y lo solucionamos.',
  },
];



const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.content
      }
    }))
  };

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className="border rounded overflow-hidden transition-all" id='faq'>
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 bg-yellow-100 hover:bg-[#692904] hover:text-[#FFDE45] text-left font-semibold transition"
            >
              <span>{item.title}</span>
              <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden bg-[#692904] ${
                isOpen ? 'max-h-auto opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
              } bg-white text-gray-700`}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
