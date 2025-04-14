import React, { useState } from 'react';
import productsData from '../data/productsData';
import ProductCard from './ProductCard'; 
import { Button } from "@material-tailwind/react";


const categories = Object.keys(productsData);

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSub(null);
  };

  const renderProducts = () => {
    if (!selectedCategory) return null;

    const data = productsData[selectedCategory];

    if (selectedCategory === 'MATES' && typeof data === 'object') {
      if (!selectedSub) return null;

      return (
        <>
          <h4 className="text-2xl font-semibold mb-4">{selectedSub}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data[selectedSub].map((prod, idx) => (
              <ProductCard key={idx} product={prod} />
            ))}
          </div>
        </>
      );
    }

    if (Array.isArray(data)) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((prod, idx) => (
            <ProductCard key={idx} product={prod} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section id="productos" className="py-24 px-6 bg-gradient-to-t from-gray-50 from-10% via-30% to-gray-200 to-90%">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">NUESTROS PRODUCTOS</h3>
        <p className="text-lg mb-10 text-left">Elegí tu categoría y descubrí nuestros productos</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((cat) => {
            const backgroundImages = {
              MATES: '/images/mates.jpg',
              TERMOS: '/images/termos.jpg',
              YERBAS: '/images/yerbas.jpg',
            };

            const bgPosition = cat === 'TERMOS' ? 'top center' : 'center';

            return (
              <button
                key={cat}
                id="producto-scroll"
                onClick={() => {
                  handleCategoryClick(cat);
                  setTimeout(() => {
                    document.getElementById('producto-scroll')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="relative h-32 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
                style={{
                  backgroundImage: `url(${backgroundImages[cat]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: bgPosition,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h4 className="text-white text-xl font-bold">{cat}</h4>
                </div>
              </button>
            );
          })}
        </div>


        {selectedCategory === 'MATES' && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {Object.keys(productsData.MATES).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSub(sub)}
                className={`px-4 py-2 rounded-lg border text-sm animate-pulse ${
                  selectedSub === sub
                    ? 'bg-orange-900 text-white border-orange-400'
                    : 'bg-white text-orange-900 border-orange-400'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {renderProducts()}
      </div>
    </section>
  );
};

export default ProductSection;
