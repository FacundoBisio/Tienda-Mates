import React from 'react';
import { RedesSociales } from './Icons.jsx';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <section className="bg-brand-dark py-5 text-center text-brand-light" id='contacto'>
    <div className="container">
        <div className="row align-items-center text-center text-md-start">

        {/* Columna 1: Logo y frase */}
        <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <img src="/Logo.png" alt="Logo" className="mb-2" style={{ width: '120px' }} />
            <strong>F&F</strong>
            <small>MATES</small>
        </div>

        {/* Columna 2: Navegación */}
        <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column gap-2 text-center font-semibold">
            <a className='hover:text-white transition' href="#inicio">Inicio</a>
            <a className='hover:text-white transition' href="#nosotros">Nosotros</a>
            <a className='hover:text-white transition' href="#productos">Productos</a>
            <a className='hover:text-white transition' href="#contacto">Contacto</a>
            <Link className='hover:text-white transition' to="/politica-de-privacidad">Privacidad</Link>
        </div>

        {/* Columna 3: Redes */}
        <div className="col-md-4 d-flex flex-column ">
            <strong className="mb-2 text-center">Contacto</strong>
            <div className="d-flex gap-3 text-center justify-content-center">   
            <RedesSociales />
            </div>
        </div>

        </div>
    </div>
    </section>
    <footer className="bg-brand-dark py-4 text-center">
            <p className="text-white font-semibold">&copy; {new Date().getFullYear()} FFMATES. Todos los derechos reservados.</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-white">
            <span>Desarrollado con 🧉 por</span>
            <a 
                href="https://www.linkedin.com/in/facundo-bisio-25a104247/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-brand-contrast transition"
            >
                Facundo Bisio
            </a>
            </div>
    </footer>
    </>

  );
};

export default Footer;