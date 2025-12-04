// src/App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accordion from './components/Accordion';
import ProductSection from './components/ProductSection';
import CartSidebar from './components/CartSidebar';
import { CartIcon } from './components/Icons.jsx';
import { useCart } from './context/Cart';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';

// Componente para la página de inicio (lo que ya tenías)
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
          <a href="#productos" className="btn btn-outline-light hover:font-semibold hover:border-[#692904] text-white px-6 py-3 rounded-lg hover:bg-[#692904]">Ver productos</a>
        </div>
      </section>

      {/* Sección "Sobre Nosotros" AGREGADA PARA ADSENSE */}
      <section id="nosotros" className="py-16 px-6 bg-[#f9f9f9] text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[#692904] mb-6">Pasión por el Mate</h3>
          <p className="text-lg text-gray-700 mb-4">
            En <strong>FFMates</strong> nos dedicamos a ofrecer productos de la más alta calidad para los amantes de esta tradición sudamericana. 
            Cada uno de nuestros mates es seleccionado cuidadosamente, priorizando materiales nobles como la calabaza brasileña, el cuero vacuno legítimo y el acero inoxidable de grado alimenticio.
          </p>
          <p className="text-lg text-gray-700">
            Creemos que un buen mate no es solo un recipiente, sino un compañero de momentos. Por eso, trabajamos con artesanos locales para brindarte piezas únicas, desde los clásicos camioneros hasta los elegantes imperiales cincelados a mano.
          </p>
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
    <div className="bg-gray-100 text-gray-800">
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

      <Footer />
    </div>
  );
}

export default App;