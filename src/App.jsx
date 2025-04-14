import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Accordion from './components/Accordion';
import TailwindModal from './components/EmailModal';
import ProductSection from './components/ProductSection';
import  CartSidebar  from './components/CartSidebar';
import { useState } from 'react';
import { CartIcon } from './components/icons.jsx';
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
          <p className="text-lg mb-10">Compartí momentos con el mejor sabor</p>
          <a href="#productos" className="btn btn-outline-light hover:font-semibold hover:border-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">Ver productos</a>
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
          <div className="flex justify-center space-x-6 mt-6">
              <a href="#" className="text-orange-400 text-2xl hover:scale-110 transition">
              <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#000000" strokeWidth="1.5"></path>
              <path d="M17.5 6.51L17.51 6.49889" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              </a>
              
              <a href="#" className="text-orange-400 text-2xl hover:scale-110 transition">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="24px" viewBox="0 0 32 32">
              <path fillRule="evenodd" d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"></path></svg>
              </a>
  
              <a href="#" className="text-orange-400 text-2xl hover:scale-110 transition">
              <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </a>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-orange-700 from-10% via-30% to-orange-900 to-90% py-4 text-center shadow-inner">
        <p className="text-white font-semibold">&copy; 2025 FFMATES. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
