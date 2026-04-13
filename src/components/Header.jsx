// src/components/Header.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { CategoryIcon } from './Icons';

const categorias = [
  { slug: 'mates',      label: 'Mates'      },
  { slug: 'termos',     label: 'Termos'     },
  { slug: 'yerbas',     label: 'Yerbas'     },
  { slug: 'bombillas',  label: 'Bombillas'  },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'combos',     label: 'Combos'     },
];

export default function Header({ onCartOpen }) {
  const [scrolled, setScrolled]       = useState(false);
  const [dropdownOpen, setDropdown]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const dropdownRef                   = useRef(null);
  const location                      = useLocation();
  const isHome                        = location.pathname === '/';
  const { cartItems }                 = useCart();
  const totalItems                    = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Cerrar mobile al navegar
  useEffect(() => { setMobileOpen(false); setDropdown(false); }, [location]);

  // ─── Tres estados visuales ───────────────────────────────────
  // 1. Hero (home, no scrolled) → transparente, letras blancas
  // 2. Scrolled o fuera del home → verde de marca, letras blancas
  const isTransparent = isHome && !scrolled;

  const navBg = isTransparent
    ? 'bg-transparent'
    : 'bg-[#3C503A]/95 backdrop-blur-xl shadow-lg';

  const textColor   = 'text-white';
  const hoverColor  = 'hover:text-[#a8c5a5]';
  const borderColor = isTransparent ? 'border-transparent' : 'border-[#2d4a2b]';

  return (
    <>
      <header className={`w-full transition-all duration-500 border-b ${borderColor} ${navBg}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className={`font-normal tracking-widest select-none text-xl ${textColor}`}
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            FFMATES
          </Link>

          {/* ── Links desktop ── */}
          <ul className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.18em] font-semibold uppercase">
            <li>
              <a href="/#inicio" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>
                Inicio
              </a>
            </li>
            <li>
              <a href="/#nosotros" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>
                Nosotros
              </a>
            </li>

            {/* ── Dropdown Productos ── */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(v => !v)}
                className={`flex items-center gap-1 uppercase text-[11px] tracking-[0.18em] font-semibold ${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}
              >
                Productos
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel dropdown */}
              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56
                bg-white rounded-2xl shadow-2xl border border-[#E8E3DC]
                overflow-hidden transition-all duration-200 origin-top
                ${dropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                {/* Triángulo decorativo */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-[#E8E3DC]" />
                <div className="py-2">
                  {categorias.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/categoria/${cat.slug}`}
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-[#1C1C1C] text-sm hover:bg-[#f0f5ef] hover:text-[#3C503A] transition-colors group"
                    >
                      <CategoryIcon slug={cat.slug} className="w-4 h-4 text-[#4C674A] flex-shrink-0" />
                      <span className="font-medium">{cat.label}</span>
                      <svg className="w-3 h-3 ml-auto text-[#ccc] group-hover:text-[#4C674A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <a href="/#contacto" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>
                Contacto
              </a>
            </li>
          </ul>

          {/* ── Derecha: carrito + hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <button
              onClick={onCartOpen}
              aria-label="Abrir carrito"
              className={`relative ${textColor} opacity-80 hover:opacity-100 transition-opacity`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#4C674A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menú"
              className={`md:hidden ${textColor} opacity-80 hover:opacity-100 transition-opacity`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </nav>

        {/* ── Menú mobile ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#3C503A] ${mobileOpen ? 'max-h-[500px] border-t border-[#2d4a2b]' : 'max-h-0'}`}>
          <div className="px-6 py-4 space-y-1">
            {[['/#inicio', 'Inicio'], ['/#nosotros', 'Nosotros'], ['/#contacto', 'Contacto']].map(([href, label]) => (
              <a key={label} href={href} className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10 last:border-0 transition-colors">
                {label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Categorías</p>
              {categorias.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  className="flex items-center gap-3 py-2.5 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <CategoryIcon slug={cat.slug} className="w-4 h-4 text-white/60 flex-shrink-0" />
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
