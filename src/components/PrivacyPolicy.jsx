import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Agregué pt-32 para separarlo bien del Header fijo
    <div className="container mx-auto px-6 py-12 pt-32 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-[#692904] mb-8 border-b-2 border-orange-200 pb-4">
        Política de Privacidad
      </h1>
      
      <div className="prose prose-orange max-w-none text-gray-700">
        <p className="mb-4">
          En <strong className="text-[#692904]">FFMates</strong>, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. 
          Esta política explica cómo recopilamos, usamos y protegemos tu información.
        </p>

        <h3 className="text-xl font-bold text-[#2E1300] mt-6 mb-2">1. Información que Recopilamos</h3>
        <p className="mb-4">
          Recopilamos información que nos proporcionas directamente al realizar una consulta o compra, 
          como tu nombre, número de teléfono y dirección de envío.
        </p>

        <h3 className="text-xl font-bold text-[#2E1300] mt-6 mb-2">2. Uso de la Información</h3>
        <p className="mb-4">
          Utilizamos tu información exclusivamente para procesar tus pedidos, responder tus consultas vía WhatsApp 
          y mejorar tu experiencia en nuestra tienda. No compartimos tus datos con terceros.
        </p>

        <h3 className="text-xl font-bold text-[#2E1300] mt-6 mb-2">3. Cookies y Tecnologías</h3>
        <p className="mb-4">
          Nuestra web utiliza cookies básicas para mejorar el rendimiento y recordar tus preferencias de navegación.
          También utilizamos Google Analytics y Google AdSense para entender mejor a nuestra audiencia.
        </p>

        <h3 className="text-xl font-bold text-[#2E1300] mt-6 mb-2">4. Contacto</h3>
        <p className="mb-8">
          Si tienes alguna duda sobre nuestra política de privacidad, no dudes en contactarnos a través de nuestros canales oficiales.
        </p>

        <Link to="/" className="inline-block bg-[#692904] text-white px-6 py-2 rounded-lg hover:bg-[#8B4513] transition font-semibold">
            Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;