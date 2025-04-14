// components/Accordion.jsx
import React, { useState, useRef, useEffect } from 'react';

const items = [
  {
    title: '¿Cómo curar el mate?',
    content: 'Curar el mate es fundamental para que no se agriete y tenga buen sabor. Llenalo con yerba usada y agua caliente (no hirviendo), dejalo reposar 24 hs, tirá todo y rascá el interior con una cuchara. Repetí este proceso 2 o 3 veces. Solo es necesario en mates de calabaza o madera.',
  },
  {
    title: '¿Cuánto dura la yerba?',
    content: 'La yerba sin abrir puede durar hasta 2 años si se guarda en un lugar seco y fresco. Una vez abierta, es ideal consumirla en 1 a 3 meses para que no pierda sabor ni aroma. Evitá la humedad y el sol directo.',
  },
  {
    title: '¿Cómo cuidar tu mate?',
    content: 'Te recomendamos después de usarlo, vaciá la yerba y dejalo secar boca abajo. No lo dejes húmedo mucho tiempo. En mates de calabaza, evitá mojar la parte exterior. Y si es de acero o vidrio, lavalo con agua tibia y secá bien.',
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className="border rounded overflow-hidden transition-all">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 bg-orange-200 hover:bg-orange-300 text-left font-semibold transition"
            >
              <span>{item.title}</span>
              <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-40 opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
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
