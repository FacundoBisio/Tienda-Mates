import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  schema 
}) => {
  const siteUrl = 'https://tienda-mates.vercel.app';
  const defaultTitle = 'FFMATES | Tienda de mates, yerbas y accesorios';
  const defaultDescription = 'Tienda de mates artesanales en Argentina. Encontrá mates imperiales, camioneros y bombillas de alpaca. Envíos seguros a todo el país. ¡Comprá online hoy!';
  const defaultImage = `${siteUrl}/mate.png`;

  const metaTitle = title ? `${title} | FFMATES` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const metaUrl = url || siteUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="robots" content="index, follow" />
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="FFMates" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
