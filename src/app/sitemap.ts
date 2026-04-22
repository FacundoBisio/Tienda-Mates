import type { MetadataRoute } from 'next';
import productsData from '@/data/productsData';

const SITE_URL = 'https://tienda-mates.vercel.app';

function getAllProductHrefs(): string[] {
  const hrefs: string[] = [];
  for (const key in productsData) {
    const cat = (productsData as Record<string, unknown>)[key];
    if (Array.isArray(cat)) {
      cat.forEach((p: { href?: string; id: string }) => hrefs.push(p.href || p.id));
    } else if (cat && typeof cat === 'object') {
      for (const subKey in cat as Record<string, Array<{ href?: string; id: string }>>) {
        const sub = (cat as Record<string, Array<{ href?: string; id: string }>>)[subKey];
        if (Array.isArray(sub)) {
          sub.forEach(p => hrefs.push(p.href || p.id));
        }
      }
    }
  }
  return [...new Set(hrefs)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = getAllProductHrefs().map(href => ({
    url: `${SITE_URL}/producto/${href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryRoutes = ['mates', 'termos', 'yerbas', 'bombillas', 'accesorios', 'combos'].map(cat => ({
    url: `${SITE_URL}/categoria/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/politica-de-privacidad`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/terminos-y-condiciones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
