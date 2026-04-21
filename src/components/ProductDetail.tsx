'use client';

// src/components/ProductDetail.tsx
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/Cart';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import { TruckIcon, ShieldIcon, CraftIcon, MateIcon } from './Icons';
import type { Product } from '@/types';

const findProductWithMeta = (data: Record<string, unknown>, key: string) => {
  if (!data) return { product: null as Product | null, categorySlug: null as string | null, categoryLabel: null as string | null, subCategory: undefined as string | undefined };
  for (const catKey in data) {
    const cat = data[catKey];
    if (Array.isArray(cat)) {
      const found = cat.find((p: Product) => p.href === key || String(p.id) === String(key));
      if (found) return { product: found as Product, categorySlug: catKey.toLowerCase(), categoryLabel: catKey.charAt(0).toUpperCase() + catKey.slice(1).toLowerCase(), subCategory: undefined };
    } else if (typeof cat === 'object' && cat !== null) {
      for (const subKey in cat as Record<string, Product[]>) {
        const sub = (cat as Record<string, Product[]>)[subKey];
        if (Array.isArray(sub)) {
          const found = sub.find((p: Product) => p.href === key || String(p.id) === String(key));
          if (found) return { product: found as Product, categorySlug: catKey.toLowerCase(), categoryLabel: catKey.charAt(0).toUpperCase() + catKey.slice(1).toLowerCase(), subCategory: subKey };
        }
      }
    }
  }
  return { product: null as Product | null, categorySlug: null as string | null, categoryLabel: null as string | null, subCategory: undefined as string | undefined };
};

const getRelatedProducts = (data: Record<string, unknown>, catKey: string | null, subKey: string | undefined, excludeId: string, limit = 4): Product[] => {
  if (!data || !catKey) return [];
  const catData = (data[catKey.toUpperCase()] || data[catKey]) as unknown;
  let pool: Product[] = [];
  if (Array.isArray(catData)) {
    pool = catData;
  } else if (typeof catData === 'object' && catData !== null) {
    const catObj = catData as Record<string, Product[]>;
    if (subKey && catObj[subKey]) {
      const same = catObj[subKey] || [];
      const others = Object.entries(catObj).filter(([k]) => k !== subKey).flatMap(([, v]) => v);
      pool = [...same, ...others];
    } else {
      pool = Object.values(catObj).flat();
    }
  }
  return pool.filter(p => String(p.id) !== String(excludeId) && p.href !== excludeId && p.stock > 0).slice(0, limit);
};

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const { allProducts, addToCart, getAvailableStock } = useCart();

  const { product, categorySlug, categoryLabel, subCategory } = useMemo(
    () => findProductWithMeta(allProducts as Record<string, unknown>, id),
    [allProducts, id]
  );

  const related = useMemo(
    () => getRelatedProducts(allProducts as Record<string, unknown>, categorySlug, subCategory, id),
    [allProducts, categorySlug, subCategory, id]
  );

  const handleAdd = () => {
    if (!product || product.stock <= 0) return;
    addToCart({ ...product, category: categoryLabel || 'Varios' });
    toast(
      <span className="text-white font-medium text-sm">✓ {product.name} agregado</span>,
      { className: 'rounded-xl bg-[#3C503A] text-white', icon: false, autoClose: 2000, hideProgressBar: true, closeButton: false }
    );
  };

  const handleShare = async () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://tienda-mates.vercel.app'}/producto/${product?.href || product?.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.name, text: `Mirá este producto de FFMates: ${product?.name}`, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast('Link copiado al portapapeles', { autoClose: 2000, hideProgressBar: true });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] p-4">
        <MateIcon className="w-12 h-12 text-[#4C674A] mb-6" />
        <h2 className="text-2xl font-normal text-[#1C1C1C] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Producto no encontrado
        </h2>
        <Link href="/" className="mt-4 text-sm text-[#4C674A] hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? '$0' : `$${Number.isInteger(price) ? price.toLocaleString('es-AR') : price.toFixed(2)}`;
  const isOutOfStock = getAvailableStock(product.id) <= 0;
  const siteUrl = 'https://tienda-mates.vercel.app';
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image?.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
    description: product.description || 'Producto artesanal de FFMates',
    brand: { '@type': 'Brand', name: 'FFMATES' },
    sku: String(product.id),
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/producto/${product.href || product.id}`,
      priceCurrency: 'ARS',
      price: String(product.price),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-4">
        <nav className="text-xs text-[#888] flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1C1C1C] transition-colors">Inicio</Link>
          <span>›</span>
          {categorySlug ? (
            <Link href={`/categoria/${categorySlug}`} className="hover:text-[#1C1C1C] transition-colors capitalize">{categoryLabel}</Link>
          ) : (
            <Link href="/categoria/mates" className="hover:text-[#1C1C1C] transition-colors">Productos</Link>
          )}
          <span>›</span>
          <span className="text-[#1C1C1C] line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-28">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#4C674A] group relative">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div className="py-4">
            <p className="text-xs tracking-widest uppercase text-[#4C674A] font-semibold mb-3">FFMATES</p>
            <h1 className="text-4xl md:text-5xl font-normal text-[#1C1C1C] leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="text-3xl font-light text-[#1C1C1C]">{formattedPrice}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${!isOutOfStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                {!isOutOfStock ? 'En stock' : 'Sin stock'}
              </span>
            </div>

            <p className="text-[#555] leading-relaxed text-base mb-10">
              {product.description || 'Producto de excelente calidad seleccionado especialmente para vos. Cada pieza es única, trabajada artesanalmente.'}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { Icon: TruckIcon,  title: 'Envío',     sub: 'A todo el país'      },
                { Icon: ShieldIcon, title: 'Garantía',  sub: 'Cambio o devolución' },
                { Icon: CraftIcon,  title: 'Artesanal', sub: 'Hecho a mano'        },
              ].map(({ Icon, title, sub }) => (
                <div key={title} className="text-center p-4 bg-white rounded-2xl border border-[#F0EDE8] hover:border-[#4C674A]/30 transition-colors">
                  <Icon className="w-5 h-5 text-[#4C674A] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1C1C1C]">{title}</p>
                  <p className="text-[11px] text-[#888] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`w-full py-4 rounded-2xl text-sm font-semibold tracking-widest uppercase transition-all active:scale-[0.98] ${
                !isOutOfStock ? 'bg-[#1C1C1C] text-white hover:bg-[#4C674A]' : 'bg-[#F0EDE8] text-[#BBBBB0] cursor-not-allowed'
              }`}
            >
              {!isOutOfStock ? 'Agregar al carrito' : 'Sin stock disponible'}
            </button>

            <a
              href={`https://wa.me/5493513662570?text=${encodeURIComponent(`Hola FFMates! Me interesa el producto: ${product.name} (${formattedPrice}). ¿Tienen disponibilidad?`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 mt-3 w-full py-3.5 rounded-2xl border border-[#E8E3DC] text-sm text-[#555] hover:border-[#4C674A] hover:text-[#4C674A] transition-all"
            >
              <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 mt-3 w-full py-3.5 rounded-2xl border border-[#E8E3DC] text-sm text-[#555] hover:border-[#4C674A] hover:text-[#4C674A] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartir producto
            </button>

            <Link
              href={categorySlug ? `/categoria/${categorySlug}` : '/'}
              className="flex items-center justify-center gap-2 mt-5 text-xs text-[#888] hover:text-[#1C1C1C] transition-colors"
            >
              ← Volver a {categoryLabel || 'inicio'}
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-8">
          <div className="border-t border-[#E8E3DC] pt-16">
            <div className="mb-10 text-center">
              <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-3">Seguí explorando</p>
              <h2 className="text-3xl md:text-4xl font-normal text-[#1C1C1C]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                También te puede gustar
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
