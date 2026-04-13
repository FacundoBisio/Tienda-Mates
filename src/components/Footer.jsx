// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryIcon } from './Icons';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-[#1a2e19] text-white">

      {/* ── Banda superior de marca ── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            {/* Logo imagen */}
            <img
              src="/Logo.png"
              alt="FFMATES logo"
              className="h-14 w-auto object-contain"
              loading="lazy"
            />
            <p
              className="text-2xl font-normal tracking-[0.2em] text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              FFMATES
            </p>
            <p className="text-[#7F997C] text-sm leading-relaxed max-w-xs">
              Mates artesanales con identidad.<br />
              Cada pieza, única. Cada momento, tuyo.
            </p>
          </div>

          {/* CTA WhatsApp */}
          <a
            href="https://wa.me/5493513662570?text=Hola%20FFMates!%20Quiero%20consultar%20por%20un%20mate."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#4C674A] text-white rounded-full text-sm font-semibold tracking-wide hover:bg-[#5a7a57] transition-all duration-300 hover:shadow-lg hover:shadow-[#4C674A]/30 group"
          >
            {/* WhatsApp icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultanos
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Grid de links ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Navegación */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#4C674A] font-semibold mb-5">Navegación</p>
            <ul className="space-y-3">
              {[['Inicio', '/#inicio'], ['Nosotros', '/#nosotros'], ['Productos', '/#productos'], ['FAQ', '/#faq']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[#7F997C] text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#4C674A] font-semibold mb-5">Categorías</p>
            <ul className="space-y-3">
              {[
                { slug: 'mates',      label: 'Mates'      },
                { slug: 'termos',     label: 'Termos'     },
                { slug: 'yerbas',     label: 'Yerbas'     },
                { slug: 'bombillas',  label: 'Bombillas'  },
                { slug: 'accesorios', label: 'Accesorios' },
                { slug: 'combos',     label: 'Combos'     },
              ].map(({ slug, label }) => (
                <li key={slug}>
                  <Link to={`/categoria/${slug}`} className="flex items-center gap-2 text-[#7F997C] text-sm hover:text-white transition-colors group">
                    <CategoryIcon slug={slug} className="w-3.5 h-3.5 text-[#4C674A] group-hover:text-white transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#4C674A] font-semibold mb-5">Contacto</p>
            <ul className="space-y-3 text-sm text-[#7F997C]">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#4C674A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Córdoba, Argentina
              </li>
              <li>
                <a
                  href="https://wa.me/5493513662570"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-[#4C674A] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ff.mates/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-[#4C674A] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#4C674A] font-semibold mb-5">Legal</p>
            <ul className="space-y-3">
              <li>
                <Link to="/politica-de-privacidad" className="text-[#7F997C] text-sm hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#4C674A] text-xs">© {year} FFMATES. Todos los derechos reservados.</p>
          <p className="text-[#4C674A] text-xs">
            Desarrollado con 🧉 por{' '}
            <a
              href="https://www.linkedin.com/in/facundo-bisio-25a104247/"
              target="_blank"
              rel="noreferrer"
              className="text-[#7F997C] hover:text-white transition-colors font-medium"
            >
              Facundo Bisio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
