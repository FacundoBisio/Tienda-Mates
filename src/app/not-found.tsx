// src/app/not-found.tsx — Server Component
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{ background: 'linear-gradient(135deg, #1a2e19 0%, #2d4a2b 40%, #3C503A 100%)' }}
    >
      <div className="max-w-xl w-full text-center">
        <p className="text-[10rem] leading-none font-normal text-white/15 select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          404
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl text-white font-normal" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Se nos escapó el <em style={{ color: '#a8c5a5' }}>mate</em>
        </h1>
        <p className="mt-4 text-white/60 text-base leading-relaxed">
          La página que buscás no existe o fue movida. Volvé al inicio y seguimos cebando.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-7 py-3 bg-white text-[#2d4a2b] rounded-full text-sm font-semibold tracking-wide hover:bg-[#a8c5a5] transition-all duration-300"
          >
            Volver al inicio
          </Link>
          <Link
            href="/categoria/mates"
            className="px-7 py-3 border border-white/30 text-white rounded-full text-sm font-medium tracking-wide hover:border-white/70 transition-colors"
          >
            Ver mates
          </Link>
        </div>
      </div>
    </div>
  );
}
