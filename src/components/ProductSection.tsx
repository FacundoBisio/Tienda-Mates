// src/components/ProductSection.tsx
import React from 'react';
import Link from 'next/link';

const categoryMeta: Record<string, { label: string; bg: string; pos: string }> = {
  mates:      { label: 'Mates',      bg: '/images/mates.webp',      pos: 'center' },
  termos:     { label: 'Termos',     bg: '/images/termos.jpg',      pos: 'top center' },
  yerbas:     { label: 'Yerbas',     bg: '/images/yerbas.jpg',      pos: 'center' },
  bombillas:  { label: 'Bombillas',  bg: '/images/bombillas.webp',  pos: 'center' },
  accesorios: { label: 'Accesorios', bg: '/images/accesorios.webp', pos: 'center' },
  combos:     { label: 'Combos',     bg: '/images/yerbas.webp',     pos: 'center' },
};

const ProductSection = () => (
  <section id="productos" className="py-28 px-6 bg-[#FAFAF8]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-3">Catálogo</p>
        <h2 className="text-4xl md:text-5xl font-normal text-[#1C1C1C]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Nuestros productos
        </h2>
        <p className="mt-4 text-[#888] text-base max-w-md mx-auto">
          Seleccioná una categoría y encontrá el compañero ideal para tus mates.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <Link
            key={slug}
            href={`/categoria/${slug}`}
            className="relative overflow-hidden rounded-2xl h-36 md:h-52 group block"
          >
            <img
              src={meta.bg}
              alt={meta.label}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: meta.pos }}
            />
            <div className="absolute inset-0 bg-[#1C1C1C]/40 group-hover:bg-[#1C1C1C]/30 transition-all duration-300" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-end">
              <p className="text-white text-lg font-medium">{meta.label}</p>
              <p className="text-white/60 text-xs mt-1 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver todos →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
