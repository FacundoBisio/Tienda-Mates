// src/app/producto/[id]/page.tsx — Server Component shell
import { cache } from 'react';
import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';
import { findProductWithMeta } from '@/utils/findProductByHref';
import productsData from '@/data/productsData';

const SITE_URL = 'https://tienda-mates.vercel.app';

const getProduct = cache((id: string) =>
  findProductWithMeta(productsData as Record<string, unknown>, id)
);

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const { product } = getProduct(id);
  if (!product) return { title: 'Producto no encontrado' };

  const ogImage = product.image?.startsWith('http')
    ? product.image
    : `${SITE_URL}${product.image}`;

  const slug = product.href || product.id;
  const desc = `Comprá ${product.name} online en FFMATES. ${product.category ? `Categoría: ${product.category}.` : ''} Precio: $${product.price}. Envío a todo el país.`;
  const keywords = [
    product.name,
    product.category || 'mate artesanal',
    'comprar online',
    'FFMATES',
    'mates artesanales Argentina',
    'envío a todo el país',
  ].filter(Boolean) as string[];

  return {
    title: product.name,
    description: desc,
    keywords,
    alternates: { canonical: `${SITE_URL}/producto/${slug}` },
    openGraph: {
      title: `${product.name} | FFMATES`,
      description: desc,
      images: [{ url: ogImage, width: 800, height: 800, alt: product.name }],
      url: `${SITE_URL}/producto/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | FFMATES`,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, categorySlug, categoryLabel } = getProduct(id);

  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${SITE_URL}${product.image}`,
    description: product.description || `${product.name} — mate artesanal de FFMates`,
    brand: { '@type': 'Brand', name: 'FFMates' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'ARS',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/producto/${product.href || product.id}`,
      seller: { '@type': 'Organization', name: 'FFMates' },
    },
  } : null;

  const breadcrumbSchema = product && categorySlug ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${SITE_URL}/categoria/${categorySlug}` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/producto/${product.href || product.id}` },
    ],
  } : null;

  return (
    <>
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
      {breadcrumbSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />}
      <ProductDetail />
    </>
  );
}
