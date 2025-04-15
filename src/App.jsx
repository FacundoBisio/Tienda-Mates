import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Accordion from './components/Accordion';
import TailwindModal from './components/EmailModal';
import ProductSection from './components/ProductSection';
import  CartSidebar  from './components/CartSidebar';
import { useState } from 'react';
import { CartIcon, RedesSociales } from './components/Icons.jsx';
import { ToastContainer } from 'react-toastify';



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
          <a href="#productos" className="btn btn-outline-light hover:font-semibold hover:border-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">Ver productos</a>
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

      <section className="py-10 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-10 font-semibold text-left">Preguntas frecuentes</p>
          <Accordion />
        </div>
      </section>

      <section id="contacto" className="py-24 px-6 bg-gradient-to-b from-yellow-50 from-10% via-30% to-yellow-200 to-90%">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Contacto</h3>
          <p className="text-lg font-semibold">¿Querés saber más? <br></br></p>
          <p className="text-lg mb-4"> Contactanos por las redes social o escribinos un mensaje.</p>
          <TailwindModal />
          <RedesSociales />
        </div>
      </section>

      <footer className="bg-gradient-to-r from-orange-700 from-10% via-30% to-orange-900 to-90% py-4 text-center shadow-inner">
        <p className="text-white font-semibold">&copy; 2025 FFMATES. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
