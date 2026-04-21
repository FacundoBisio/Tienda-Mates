'use client';

// src/components/Header.tsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/Cart';
import { CategoryIcon } from './Icons';

const categorias = [
  { slug: 'mates',      label: 'Mates'      },
  { slug: 'termos',     label: 'Termos'     },
  { slug: 'yerbas',     label: 'Yerbas'     },
  { slug: 'bombillas',  label: 'Bombillas'  },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'combos',     label: 'Combos'     },
];

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const [scrolled, setScrolled]     = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef                 = useRef<HTMLLIElement>(null);
  const pathname                    = usePathname();
  const router                      = useRouter();
  const isHome                      = pathname === '/';
  const { cartItems }               = useCart();
  const totalItems                  = useMemo(() => cartItems.reduce((acc, i) => acc + i.quantity, 0), [cartItems]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef              = useRef<HTMLInputElement>(null);
  const searchContainerRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(false); }, [pathname]);

  const isTransparent = isHome && !scrolled;
  const navBg       = isTransparent ? 'bg-transparent' : 'bg-[#3C503A]/95 backdrop-blur-xl shadow-lg';
  const textColor   = 'text-white';
  const hoverColor  = 'hover:text-[#a8c5a5]';
  const borderColor = isTransparent ? 'border-transparent' : 'border-[#2d4a2b]';

  return (
    <>
      <header className={`w-full transition-all duration-500 border-b ${borderColor} ${navBg}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">

          <Link
            href="/"
            className={`font-normal tracking-widest select-none text-xl ${textColor}`}
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            FFMATES
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.18em] font-semibold uppercase">
            <li>
              <a href="/#inicio" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>Inicio</a>
            </li>
            <li>
              <a href="/#nosotros" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>Nosotros</a>
            </li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(v => !v)}
                className={`flex items-center gap-1 uppercase text-[11px] tracking-[0.18em] font-semibold ${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}
              >
                Productos
                <svg className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56
                bg-white rounded-2xl shadow-2xl border border-[#E8E3DC]
                overflow-hidden transition-all duration-200 origin-top
                ${dropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-[#E8E3DC]" />
                <div className="py-2">
                  {categorias.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categoria/${cat.slug}`}
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
              <a href="/#contacto" className={`${textColor} opacity-75 ${hoverColor} hover:opacity-100 transition-all`}>Contacto</a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/favoritos" aria-label="Favoritos" className={`${textColor} opacity-75 hover:opacity-100 transition-opacity`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <button onClick={() => setSearchOpen(v => !v)} aria-label="Buscar" className={`${textColor} opacity-75 hover:opacity-100 transition-opacity`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href="/admin"
              aria-label="Panel de administración"
              className={`${textColor} opacity-20 hover:opacity-50 transition-opacity`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </Link>
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

        {/* Search panel */}
        <div
          ref={searchContainerRef}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${searchOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-t border-white/10 bg-[#3C503A]/98 backdrop-blur-xl px-6 md:px-12 py-5">
            <div className="max-w-7xl mx-auto">
              <div className="relative mb-4">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                    if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
                  }}
                  placeholder="Buscar productos..."
                  className="w-full bg-white/10 text-white placeholder-white/40 text-sm pl-11 pr-4 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                />
              </div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2.5">Explorar categorías</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {categorias.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/8 hover:bg-white/18 border border-white/10 hover:border-white/25 transition-all text-white/75 hover:text-white text-xs"
                  >
                    <CategoryIcon slug={cat.slug} className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="font-medium">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                  href={`/categoria/${cat.slug}`}
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
