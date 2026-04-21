import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/buscar', '/favoritos', '/api/'],
      },
    ],
    sitemap: 'https://tienda-mates.vercel.app/sitemap.xml',
  };
}
