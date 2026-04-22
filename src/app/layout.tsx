import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { dmSerif, dmSans } from '@/lib/fonts';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tienda-mates.vercel.app'),
  title: {
    default: 'FFMATES | Tienda de Mates Artesanales en Argentina',
    template: '%s | FFMATES',
  },
  description:
    'Tienda de mates artesanales en Córdoba, Argentina. Mates imperiales, camioneros, bombillas de alpaca y yerbas seleccionadas. Envíos seguros a todo el país. ¡Comprá online hoy!',
  keywords: [
    'mates artesanales',
    'mate imperial',
    'mate camionero',
    'bombillas alpaca',
    'yerba mate',
    'accesorios mate',
    'tienda de mates',
    'mates córdoba',
    'comprar mate online',
    'Argentina',
  ],
  authors: [{ name: 'FFMates' }],
  creator: 'FFMates',
  publisher: 'FFMates',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'qVJfvKTooZZ0w5MC9MiktuJCeRHnR9MR0_YY9g4Ng_4' },
  openGraph: {
    siteName: 'FFMATES',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/mate.png', width: 1200, height: 630, alt: 'FFMATES - Tienda de mates artesanales' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ffmates',
    images: ['/mate.png'],
  },
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
  manifest: '/manifest.json',
  other: { 'google-adsense-account': 'ca-pub-8733421112963155' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  return (
    <html lang="es" className={`${dmSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8733421112963115"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics gaId="G-6BXVVQHB38" />
        {fbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
