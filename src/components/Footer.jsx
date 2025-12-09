import React from 'react';
import { RedesSociales } from './Icons.jsx';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <section className="bg-[#FFDE45] py-5 text-center text-[#692904]" id='contacto'>
    <div className="container">
        <div className="row align-items-center text-center text-md-start">

        {/* Columna 1: Logo y frase */}
        <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <img src="/Logo-frase.png" alt="Logo" className="mb-2" style={{ width: '120px' }} />
            <strong>F&F</strong>
            <small>MATES</small>
        </div>

        {/* Columna 2: Navegación */}
        <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column gap-2 text-center hover:text-[#2E1300] font-semibold">
            <a href="#inicio">Inicio</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#productos">Productos</a>
            <a href="#contacto">Contacto</a>
            <Link to="/politica-de-privacidad">Privacidad</Link>
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
    <footer className="bg-[#FFDE45] py-4 text-center">
            <p className="text-[#2E1300] font-semibold">&copy; {new Date().getFullYear()} FFMATES. Todos los derechos reservados.</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[#2E1300]">
            <span>Desarrollado con 🧉 por</span>
            <a 
                href="https://www.linkedin.com/in/facundo-bisio-25a104247/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-[#2E1300] hover:text-[#692904] transition"
            >
                Facundo Bisio
            </a>
            </div>
    </footer>
    </>

  );
};

export default Footer;