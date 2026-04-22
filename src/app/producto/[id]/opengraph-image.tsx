// src/app/producto/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { findProductWithMeta } from '@/utils/findProductByHref';
import productsData from '@/data/productsData';

export const runtime = 'edge';
export const alt = 'FFMATES';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SITE_URL = 'https://tienda-mates.vercel.app';

export default async function OG({ params }: { params: { id: string } }) {
  const { product, categoryLabel } = findProductWithMeta(
    productsData as Record<string, unknown>,
    params.id
  );

  const name = product?.name ?? 'FFMATES';
  const price = product?.price ? `$${product.price}` : '';
  const image = product?.image
    ? product.image.startsWith('http')
      ? product.image
      : `${SITE_URL}${product.image}`
    : `${SITE_URL}/mate.png`;
  const category = categoryLabel ?? 'Mates artesanales';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #1a2e19 0%, #2d4a2b 40%, #3C503A 100%)',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              FFMATES · {category}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 68,
                fontWeight: 600,
                lineHeight: 1.1,
                maxWidth: 620,
                display: 'flex',
              }}
            >
              {name}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {price && (
              <div
                style={{
                  padding: '14px 28px',
                  background: 'white',
                  color: '#2d4a2b',
                  borderRadius: 999,
                  fontSize: 34,
                  fontWeight: 700,
                }}
              >
                {price}
              </div>
            )}
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>
              tienda-mates.vercel.app
            </div>
          </div>
        </div>
        <div
          style={{
            width: 560,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            width={460}
            height={460}
            style={{ objectFit: 'cover', borderRadius: 32 }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
