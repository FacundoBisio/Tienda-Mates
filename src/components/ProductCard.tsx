'use client';

// src/components/ProductCard.tsx
import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/Cart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'react-toastify';
import type { Product } from '@/types';

const ProductCard = React.memo(({ product }: { product: Product }) => {
  const { addToCart, getAvailableStock } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, category: product.category || 'Varios' });
    toast(
      <span className="text-white font-medium text-sm">✓ {product.name} agregado al carrito</span>,
      {
        className: 'rounded-xl bg-[#3C503A] text-white',
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  }, [addToCart, product]);

  const formattedPrice = useMemo(() => {
    const price = parseFloat(product.price);
    return isNaN(price)
      ? '$0'
      : `$${Number.isInteger(price) ? price.toLocaleString('es-AR') : price.toFixed(2)}`;
  }, [product.price]);

  const productPath = `/producto/${product.href || product.id}`;
  const isOutOfStock = getAvailableStock(product.id) <= 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(76,103,74,0.18)] flex flex-col h-full">
      <Link href={productPath} className="block relative overflow-hidden bg-[#4C674A]" style={{ aspectRatio: '1/1' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-white bg-black/50 px-3 py-1 rounded-full">Sin stock</span>
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
          aria-label={wishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110"
        >
          <svg className={`w-4 h-4 transition-colors ${wishlisted ? 'text-red-500 fill-current' : 'text-white/70'}`} fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={productPath}>
          <h5 className="text-[15px] font-medium text-[#1C1C1C] leading-snug hover:text-[#4C674A] transition-colors mb-1 line-clamp-2">
            {product.name}
          </h5>
        </Link>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <p className="text-[14px] font-semibold text-[#1C1C1C]">{formattedPrice}</p>
          {isOutOfStock && <span className="text-[11px] text-red-400 font-medium">Agotado</span>}
        </div>

        <button
          disabled={isOutOfStock}
          onClick={handleAdd}
          className={`mt-3 w-full py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            !isOutOfStock
              ? 'bg-[#1C1C1C] text-white hover:bg-[#4C674A] active:scale-[0.98]'
              : 'bg-[#F0EDE8] text-[#BBBBB0] cursor-not-allowed'
          }`}
        >
          {!isOutOfStock ? 'Agregar al carrito' : 'Sin stock'}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

