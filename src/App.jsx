import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import Accordion from './components/Accordion';
import ProductSection from './components/ProductSection';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';
import WhatsAppButton from './components/WhatsAppButton';
import CategoryPage from './pages/CategoryPage';
import SEO from './components/SEO';

import { useCart } from './context/Cart';
import productsData from './data/productsData';
import { CraftIcon, TruckIcon, ChatIcon } from './components/Icons';

// ──────────────────────────────────────────────────────────────
// HERO — fondo elegante generado con CSS, sin imagen externa
// ──────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    id="inicio"
    className="relative min-h-screen flex items-end md:items-center pb-24 md:pb-0 overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #1a2e19 0%, #2d4a2b 30%, #3C503A 55%, #4C674A 80%, #5a7a57 100%)',
    }}
  >
    {/* Textura decorativa — círculos difusos tipo Apple */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,153,124,0.25) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,103,74,0.3) 0%, transparent 70%)',
      }} />
      {/* Líneas decorativas sutiles */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Elemento visual decorativo derecha — mate estilizado */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 opacity-10"
        style={{
          background: 'url(/images/mates/imperiales/ImperialConBase.jpeg) center/cover no-repeat',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />
    </div>

    {/* Contenido */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div className="max-w-xl fade-up">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-5 delay-100">
          Mates artesanales · Córdoba, Argentina
        </p>
        <h1
          className="text-5xl md:text-7xl font-normal text-white leading-tight mb-6 delay-200"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          El mate que<br />
          <em style={{ color: '#a8c5a5' }}>te define</em>
        </h1>
        <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-md delay-300">
          Piezas únicas hechas a mano. Cada mate cuenta una historia. ¿Cuál va a ser la tuya?
        </p>
        <div className="flex flex-wrap gap-4 delay-400">
          <Link
            to="/categoria/mates"
            className="px-8 py-3.5 bg-white text-[#2d4a2b] rounded-full text-sm font-semibold tracking-wide hover:bg-[#a8c5a5] transition-all duration-300"
          >
            Explorar mates
          </Link>
          <a
            href="#nosotros"
            className="px-8 py-3.5 border border-white/30 text-white rounded-full text-sm font-medium tracking-wide hover:border-white/70 transition-colors"
          >
            Nuestra historia
          </a>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────
// PRODUCTOS DESTACADOS — 3 imágenes grandes antes del catálogo
// ──────────────────────────────────────────────────────────────
const destacados = [
  {
    name: 'Imperial Cincelado Con Base',
    price: '$40.999',
    image: '/images/mates/imperiales/ImperialCinceladoConBase.jpeg',
    href: '/producto/ImperialCinceladoConBase',
    tag: 'Más vendido',
  },
  {
    name: 'Torpedo Nacional Premium',
    price: '$59.999',
    image: '/images/mates/torpedos/TorpedoNacionalPremium.jpeg',
    href: '/producto/TorpedoNacionalPremium',
    tag: 'Premium',
  },
  {
    name: 'Ranchero de Algarrobo',
    price: '$39.999',
    image: '/images/mates/camioneros/RancheroAlgarrobo.png',
    href: '/producto/RancheroAlgarrobo',
    tag: 'Edición especial',
  },
];

const ProductosDestacados = () => (
  <section className="py-20 px-6 bg-[#FAFAF8]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-3">Selección</p>
        <h2
          className="text-4xl md:text-5xl font-normal text-[#1C1C1C]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Productos destacados
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destacados.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className="group relative overflow-hidden rounded-3xl bg-[#4C674A]"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Imagen */}
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

            {/* Tag */}
            <div className="absolute top-5 left-5">
              <span className="text-[11px] font-semibold uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/20">
                {item.tag}
              </span>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="text-white text-xl font-medium leading-snug mb-1">{item.name}</h3>
              <p className="text-white/60 text-sm">{item.price}</p>
              <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/80 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-xs tracking-widest uppercase">Ver producto</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────
// SOBRE NOSOTROS — más color, social proof y vida
// ──────────────────────────────────────────────────────────────
const stats = [
  { value: '500+', label: 'Clientes satisfechos' },
  { value: '60+',  label: 'Modelos únicos' },
  { value: '4★',   label: 'Valoración promedio' },
  { value: '24hs', label: 'Tiempo de respuesta' },
];

const SobreNosotros = () => (
  <section id="nosotros" className="py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f2 0%, #eef2ec 60%, #f8f6f2 100%)' }}>
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-4">Nuestra historia</p>
        <h2
          className="text-4xl md:text-5xl font-normal text-[#1C1C1C] leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Más que un mate,<br /><em>una tradición</em>
        </h2>
        <p className="mt-6 text-[#555] text-lg leading-relaxed">
          En <strong className="text-[#4C674A] font-medium">FFMates</strong> creemos que un buen mate es un compañero de momentos. Trabajamos cada pieza con la misma pasión con que se prepara el primer mate de la mañana.
        </p>
      </div>

      {/* ── Social proof strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-3xl bg-white border border-[#E8E3DC]">
        {stats.map((s) => (
          <div key={s.label} className="text-center py-2">
            <p
              className="text-3xl md:text-4xl font-normal text-[#3C503A] mb-1"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-[#888] tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards con acento de color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            num: '01',
            title: 'Calidad Artesanal',
            desc: 'Cada pieza es única, trabajada a mano con calabaza brasileña seleccionada y cuero vacuno legítimo. Sin producción en serie.',
            accent: '#4C674A',
            bg: '#f0f5ef',
            Icon: CraftIcon,
          },
          {
            num: '02',
            title: 'Envíos a Todo el País',
            desc: 'Recibí tu pedido en la puerta. Embalamos con cuidado para que llegue perfecto, sin importar dónde estés en Argentina.',
            accent: '#3C503A',
            bg: '#eaf0e9',
            Icon: TruckIcon,
          },
          {
            num: '03',
            title: 'Atención Personalizada',
            desc: 'Te asesoramos por WhatsApp para que elijas el mate ideal. ¿Buscás un regalo especial? Consultanos y lo pensamos juntos.',
            accent: '#2d4a2b',
            bg: '#e4ede3',
            Icon: ChatIcon,
          },
        ].map((item) => (
          <div
            key={item.num}
            className="relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            style={{ backgroundColor: item.bg }}
          >
            {/* Número decorativo de fondo */}
            <span
              className="absolute -top-4 -right-2 text-[120px] font-bold leading-none select-none pointer-events-none"
              style={{ color: item.accent, opacity: 0.06 }}
            >
              {item.num}
            </span>

            <item.Icon className="w-7 h-7 mb-5" style={{ color: item.accent }} />
            <p className="text-xs text-[#BBBBB0] font-mono mb-3">{item.num}</p>
            <h3 className="text-xl font-medium text-[#1C1C1C] mb-3">{item.title}</h3>
            <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>

            {/* Línea de acento inferior */}
            <div className="mt-6 w-10 h-0.5 rounded-full" style={{ backgroundColor: item.accent }} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────
const FAQSection = () => (
  <section id="faq" className="py-28 px-6 bg-[#FAFAF8]">
    <div className="max-w-3xl mx-auto">
      <div className="mb-14 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4C674A] font-semibold mb-3">Preguntas frecuentes</p>
        <h2 className="text-4xl font-normal text-[#1C1C1C]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          ¿Tenés dudas?
        </h2>
      </div>
      <Accordion />
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────
// HOME
// ──────────────────────────────────────────────────────────────
const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FFMates",
    "url": "https://tienda-mates.vercel.app",
    "logo": "https://tienda-mates.vercel.app/Logo.png",
    "description": "Tienda de mates artesanales y accesorios en Argentina.",
  };
  return (
    <>
      <SEO schema={organizationSchema} />
      <Hero />
      <SobreNosotros />
      <ProductosDestacados />
      <ProductSection />
      <FAQSection />
    </>
  );
};

// ──────────────────────────────────────────────────────────────
// APP ROOT
// ──────────────────────────────────────────────────────────────
function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-[#FAFAF8] text-[#1C1C1C] relative">
      <ToastContainer className="pt-24" />

      {/* Bloque fijo: AnnouncementBar + Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header onCartOpen={() => setCartOpen(true)} />
      </div>

      <Routes>
        <Route path="/"                       element={<Home />} />
        <Route path="/categoria/:cat"         element={<CategoryPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/producto/:id"           element={<ProductDetail />} />
      </Routes>

      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
