import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Accordion from './components/Accordion';
import ProductSection from './components/ProductSection';
import  CartSidebar  from './components/CartSidebar';
import { useState } from 'react';
import { CartIcon } from './components/Icons.jsx';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer.jsx';



function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Toast notifications */}
      <ToastContainer className="py-20" />
      {/* Header section */}
      <Header />
      
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


      {/* Carrito section */}
      <div>
        <button
          onClick={() => setCartOpen(true)}
          className="fixed top-4 right-4 bg-transparent text-white font-semibold px-2 py-3 z-50"
        >
          <CartIcon />
        </button>
        <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </div>

      {/* Products section */}
      <ProductSection />

      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold text-left text-[#2E1300]">Preguntas frecuentes</p>
        <p className="text-lg mb-10 text-left">¿Necesitas ayuda? Aquí puedes encontrar las preguntas más frecuentes.</p>
          <Accordion />
        </div>
      </section>


      {/* Contact section */}
      <Footer />
    </div>
  );
}

export default App;
