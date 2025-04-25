import React, { useState } from 'react';
import productsData from '../data/productsData';
import ProductCard from './ProductCard';
import { Button } from "@material-tailwind/react";

const categories = Object.keys(productsData);

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const categoryTitles = {
    MATES: "mates artesanales",
    TERMOS: "termos de calidad",
    YERBAS: "yerbas seleccionadas",
    BOMBILLAS: "bombillas únicas",
    ACCESORIOS: "accesorios para tu mate",
    COMBOS: "combos especiales"
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSub(null);
  };

  const renderProducts = () => {
    if (!selectedCategory) return null;

    const data = productsData[selectedCategory];

    if (selectedCategory === 'MATES' && typeof data === 'object') {
      const allProducts = !selectedSub
        ? Object.values(data).flat()
        : data[selectedSub];

      return (
        <>
          {selectedSub && (
            <h4 className="text-2xl justify-center font-semibold mb-4">{selectedSub}</h4>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((prod, idx) => (
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
    <section id="productos" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-[#2E1300]">NUESTROS PRODUCTOS</h3>
        <p className="text-lg mb-5 text-center text-[#2E1300]">Elegí tu categoría y descubrí nuestros productos</p>

        {/* Categorías con grid (no centrado) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((cat) => {
            const backgroundImages = {
              MATES: '/images/mates.webp',
              TERMOS: '/images/termos.jpg',
              YERBAS: '/images/yerbas.jpg',
              BOMBILLAS: '/images/bombillas.webp',
              ACCESORIOS: '/images/accesorios.webp',
              COMBOS: '/images/yerbas.webp',
            };

            const bgPosition = cat === 'TERMOS' ? 'top center' : 'center';

            return (
              <button
                key={cat}
                onClick={() => {
                  handleCategoryClick(cat);
                  setTimeout(() => {
                    document.getElementById('producto-scroll')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="relative h-32 sm:h-40 lg:h-[200px] lg:aspect-square w-full rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
                style={{
                  backgroundImage: `url(${backgroundImages[cat]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: bgPosition,
                }}
              >
                <div className="absolute inset-0 bg-[#692904] bg-opacity-30 flex items-center justify-center">
                  <h4 className="text-white text-xl font-bold">{cat}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory === 'MATES' && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 px-4" id="producto-scroll">
          <h3 className="text-3xl font-bold text-[#2E1300] mb-4 sm:mb-0">Todos nuestros productos</h3>

          {/* Dropdown Tailwind */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-[#2E1300] bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#692904]"
            >
              {selectedSub || "Destacados"}
              <svg
                className={`w-4 h-4 transition-transform ${openDropdown ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.516 7.548a.5.5 0 01.707 0L10 11.325l3.777-3.777a.5.5 0 11.707.707l-4.13 4.13a.5.5 0 01-.707 0l-4.13-4.13a.5.5 0 010-.707z" />
              </svg>
            </button>

            {openDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ">
                <div className="py-1">
                  {Object.keys(productsData.MATES).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSub(sub);
                        setOpenDropdown(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-[#2E1300] hover:bg-gray-200 "
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedCategory && selectedCategory !== 'MATES' && (
        <div className="flex justify-center items-center mb-10 px-4" id="producto-scroll">
          <h3 className="text-3xl font-bold text-[#2E1300] text-center">
            Todos nuestros {categoryTitles[selectedCategory] || selectedCategory.toLowerCase()}
          </h3>
        </div>
      )}
        {renderProducts()}
      </div>
    </section>
  );
};

export default ProductSection;
