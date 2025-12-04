// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Importamos esto

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // 2. Obtenemos la ruta actual

  // Verificamos si estamos en el Home ('/')
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Lógica: Si scrolleamos O si NO estamos en el home, aplicamos el estilo sólido
  const showSolidNav = scrolled || !isHome;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        showSolidNav ? 'bg-[#FFDE45] shadow-md text-[#692904]' : 'bg-transparent text-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center py-4 px-6 md:px-20 justify-center md:justify-between">
        {/* Si querés que el logo linkee al home siempre: */}
        <a href="/" className="text-2xl font-bold text-center md:text-left hover:opacity-80">FFMATES</a>
        
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li><a href="/#inicio" className="hover:text-[#2E1300] transition">INICIO</a></li>
          <li><a href="/#productos" className="hover:text-[#2E1300] transition">PRODUCTOS</a></li>
          <li><a href="/#faq" className="hover:text-[#2E1300] transition">FAQ</a></li>
          <li><a href="/#contacto" className="hover:text-[#2E1300] transition">CONTACTO</a></li>
        </ul>
      </nav>
    </header>
  );
}