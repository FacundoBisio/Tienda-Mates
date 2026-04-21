'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/Cart';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import type { Product } from '@/types';

export default function FavoritosPage() {
  const { allProducts, isLoading } = useCart();
  const { wishlist, toggle } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!allProducts || wishlist.length === 0) { setProducts([]); return; }
    const found: Product[] = [];
    const search = (data: unknown) => {
      if (Array.isArray(data)) {
        data.forEach(p => { if (wishlist.includes(p.id)) found.push(p); });
      } else if (data && typeof data === 'object') {
        Object.values(data).forEach(search);
      }
    };
    search(allProducts);
    setProducts(found);
  }, [allProducts, wishlist]);

  return (
    <div className="min-h-screen bg-[#F5F0EA] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-2">Tus productos</p>
          <h1 className="text-3xl text-[#1C1C1C]" style={{ fontFamily: "'DM Serif Display', serif" }}>Favoritos</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-[#aaa] text-sm">Cargando...</div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#aaa] text-sm mb-4">No tenés productos favoritos todavía.</p>
            <Link href="/" className="text-xs tracking-widest uppercase text-[#4C674A] hover:underline">Explorar productos →</Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#aaa] text-sm mb-4">Los productos guardados ya no están disponibles.</p>
            <Link href="/" className="text-xs tracking-widest uppercase text-[#4C674A] hover:underline">Explorar productos →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
