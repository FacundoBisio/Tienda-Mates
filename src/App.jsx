import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Iconos para la sección "Sobre Nosotros" (SVG)
import { FaShieldAlt, FaHandshake, FaMugHot } from 'react-icons/fa';

// Componentes
import Header from './components/Header';
import Accordion from './components/Accordion';
import ProductSection from './components/ProductSection';
import CartSidebar from './components/CartSidebar';
import { CartIcon } from './components/Icons.jsx';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';
import WhatsAppButton from './components/WhatsAppButton';
import { useCart } from './context/Cart';

// Componente para la página de inicio
const Home = () => {
  return (
    <>
      {/* Background image section */}
      <section
        id="inicio"
        className="min-h-screen flex items-center justify-center bg-cover bg-center md:bg-left"
        style={{ backgroundImage: 'url(/fondoMate.jpg)' }}
      >
        <div className="text-white bg-opacity-50 p-10 mx-10 rounded-xl text-center fade-in">
          <h2 className="text-4xl font-bold ">Bienvenido a nuestra tienda</h2>
          <p className="text-lg mb-10">Creá momentos únicos con nuestros mates.</p>
          <a href="#productos" className="btn btn-outline-light hover:font-semibold hover:border-[#692904] text-white px-6 py-3 rounded-lg hover:bg-[#692904]">
            Ver productos
          </a>
        </div>
      </section>

      {/* Sección "Sobre Nosotros" MEJORADA (Espaciado ajustado) */}
      <section id="nosotros" className="bg-orange-50 py-16 px-6 rounded-3xl my-12 mx-auto max-w-6xl">
        {/* CAMBIO ACÁ: mb-16 para dar más aire abajo del título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#2E1300] mb-4">Más que un Mate, una Tradición</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            En <span className="font-bold text-[#692904]">FFMates</span> creemos que un buen mate no es solo un recipiente, sino un compañero de momentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Tarjeta 1: Materiales */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center">
            <div className="mb-4 p-3 bg-orange-100 rounded-full">
                <FaShieldAlt size={32} color="#692904" />
            </div>
            <h3 className="font-bold text-[#2E1300] text-lg mb-2">Materiales Nobles</h3>
            <p className="text-sm text-gray-600">
              Priorizamos calabaza brasileña, cuero vacuno legítimo y acero inoxidable de grado alimenticio.
            </p>
          </div>

          {/* Tarjeta 2: Artesanos */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center">
            <div className="mb-4 p-3 bg-orange-100 rounded-full">
                <FaHandshake size={32} color="#692904" />
            </div>
            <h3 className="font-bold text-[#2E1300] text-lg mb-2">Artesanos Locales</h3>
            <p className="text-sm text-gray-600">
              Trabajamos mano a mano con artesanos para brindarte piezas únicas y con historia.
            </p>
          </div>

          {/* Tarjeta 3: Variedad */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center">
             <div className="mb-4 p-3 bg-orange-100 rounded-full">
                <FaMugHot size={32} color="#692904" />
            </div>
            <h3 className="font-bold text-[#2E1300] text-lg mb-2">Variedad Premium</h3>
            <p className="text-sm text-gray-600">
              Desde los clásicos camioneros rústicos hasta los elegantes imperiales cincelados a mano.
            </p>
          </div>
        </div>
      </section>

      {/* Products section */}
      <ProductSection />

      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg font-semibold text-left text-[#2E1300]">Preguntas frecuentes</p>
          <p className="text-lg mb-10 text-left">¿Necesitas ayuda? Aquí puedes encontrar las preguntas más frecuentes.</p>
          <Accordion />
        </div>
      </section>
    </>
  );
};

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white text-gray-800 relative">
      <ToastContainer className="py-20" />
      <Header />
      
      {/* Definición de Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>

      {/* Carrito global */}
      <div>
        <button
          onClick={() => setCartOpen(true)}
          className="fixed top-4 right-4 bg-transparent text-white font-semibold px-2 py-3 z-50"
        >
          <div className="relative">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </button>
        <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </div>
      
      {/* Botón Flotante de WhatsApp */}
      <WhatsAppButton />

      <Footer />
    </div>
  );
}

export default App;