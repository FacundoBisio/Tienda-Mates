// src/app/producto/[id]/page.tsx — Server Component shell
import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';
import { findProductWithMeta } from '@/utils/findProductByHref';
import productsData from '@/data/productsData';

const SITE_URL = 'https://tienda-mates.vercel.app';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const { product } = findProductWithMeta(productsData as Record<string, unknown>, id);
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

export default function ProductoPage() {
  return <ProductDetail />;
}
