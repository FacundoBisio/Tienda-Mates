// src/pages/CategoryPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/Cart';
import SEO from '../components/SEO';
import { CategoryIcon } from '../components/Icons';

const categoryMeta = {
  mates:      { key: 'MATES',      label: 'Mates Artesanales',   desc: 'Cada pieza es única, trabajada a mano con materiales de primera calidad.' },
  termos:     { key: 'TERMOS',     label: 'Termos',               desc: 'Mantené el agua caliente por 24 horas. Diseño y funcionalidad en uno.'    },
  yerbas:     { key: 'YERBAS',     label: 'Yerbas Seleccionadas', desc: 'Las mejores yerbas uruguayas y argentinas, seleccionadas para vos.'       },
  bombillas:  { key: 'BOMBILLAS',  label: 'Bombillas',            desc: 'Desde las más simples hasta las más trabajadas en alpaca cincelada.'       },
  accesorios: { key: 'ACCESORIOS', label: 'Accesorios',           desc: 'Materas, mochilas y sets completos para llevar tu ritual a donde vayas.'  },
  combos:     { key: 'COMBOS',     label: 'Combos Especiales',    desc: 'Paquetes pensados para regalar o para empezar con todo lo necesario.'    },
};

const CategoryPage = () => {
  const { cat } = useParams();
  const navigate = useNavigate();
  const { allProducts } = useContext(CartContext);
  const [selectedSub, setSelectedSub] = useState(null);
  // ✅ Default: precio menor a mayor
  const [sortBy, setSortBy] = useState('price-asc');

  const meta = categoryMeta[cat?.toLowerCase()];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSub(null);
  }, [cat]);

  if (!meta) {
    navigate('/');
    return null;
  }

  const rawData = productsData[meta.key];
  const hasSubs = meta.key === 'MATES' && typeof rawData === 'object' && !Array.isArray(rawData);
  const subs = hasSubs ? Object.keys(rawData) : [];

  const getUpdated = (product) => {
    const data = allProducts?.[meta.key];
    if (!data) return product;
    if (hasSubs) {
      const list = !selectedSub ? Object.values(data).flat() : data[selectedSub] || [];
      return list.find(p => p.id === product.id) || product;
    }
    if (Array.isArray(data)) return data.find(p => p.id === product.id) || product;
    return product;
  };

  let products = hasSubs
    ? (!selectedSub ? Object.values(rawData).flat() : rawData[selectedSub] || [])
    : (Array.isArray(rawData) ? rawData : []);

  // Deduplicar por id
  const seen = new Set();
  products = products.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  // Ordenar
  if (sortBy === 'price-asc')  products = [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  if (sortBy === 'price-desc') products = [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  const siteUrl = 'https://tienda-mates.vercel.app';

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28">
      <SEO
        title={meta.label}
        description={`${meta.desc} Comprá online en FFMATES con envío a todo el país.`}
        url={`${siteUrl}/categoria/${cat}`}
        type="website"
      />

      {/* Header de categoría */}
      <div className="bg-white border-b border-[#F0EDE8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <nav className="text-xs text-[#888] flex items-center gap-2 mb-8">
            <Link to="/" className="hover:text-[#1C1C1C] transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-[#1C1C1C] font-medium">{meta.label}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <CategoryIcon slug={cat} className="w-8 h-8 text-[#4C674A] mb-2" />
              <h1
                className="text-4xl md:text-5xl font-normal text-[#1C1C1C] leading-tight"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {meta.label}
              </h1>
              <p className="mt-3 text-[#666] max-w-xl">{meta.desc}</p>
            </div>
            <p className="text-sm text-[#999] whitespace-nowrap">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          {hasSubs && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSub(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  !selectedSub
                    ? 'bg-[#1C1C1C] text-white'
                    : 'bg-white border border-[#E8E3DC] text-[#555] hover:border-[#4C674A]'
                }`}
              >
                Todos
              </button>
              {subs.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    selectedSub === sub
                      ? 'bg-[#4C674A] text-white'
                      : 'bg-white border border-[#E8E3DC] text-[#555] hover:border-[#4C674A]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto px-4 py-2 bg-white border border-[#E8E3DC] rounded-xl text-sm text-[#555] focus:outline-none focus:border-[#4C674A] cursor-pointer"
          >
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Grid de productos */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod, idx) => (
              <div
                key={`${prod.id}-${idx}`}
                className="fade-up"
                style={{ animationDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
              >
                <ProductCard
                  product={{ ...getUpdated(prod), category: meta.key, catKey: selectedSub || meta.key }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#888]">
            <p className="text-4xl mb-4">🧉</p>
            <p>No hay productos disponibles por el momento.</p>
          </div>
        )}

        {/* Otras categorías */}
        <div className="mt-20 pt-12 border-t border-[#F0EDE8]">
          <p className="text-xs tracking-widest uppercase text-[#888] mb-6 text-center">Explorar otras categorías</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(categoryMeta)
              .filter(([slug]) => slug !== cat?.toLowerCase())
              .map(([slug, m]) => (
                <Link
                  key={slug}
                  to={`/categoria/${slug}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E8E3DC] rounded-full text-sm text-[#555] hover:border-[#4C674A] hover:text-[#4C674A] transition-all"
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
