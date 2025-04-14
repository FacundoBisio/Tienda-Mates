import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-orange-700 shadow-md' : 'bg-transparent'
      } text-white`}
    >
      <nav className="max-w-6xl mx-auto flex items-center py-4 px-6 md:px-20 justify-center md:justify-between">
        <h1 className="text-2xl font-bold text-center md:text-left">FFMATES</h1>
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li><a href="#inicio" className="hover:text-orange-600 transition">Inicio</a></li>
          <li><a href="#productos" className="hover:text-orange-600 transition">Productos</a></li>
          <li><a href="#contacto" className="hover:text-orange-600 transition">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
