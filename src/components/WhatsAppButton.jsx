import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  // Cambiá este número por el tuyo real
  const phoneNumber = "5493513662570"; 
  const message = "Hola FFMates! Estoy viendo la web y quería consultar por un mate.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp" 
    >
      {/* Icono */}
      <FaWhatsapp size={24} />
      
      {/* Tooltip opcional que aparece al pasar el mouse */}
      <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-medium">
        ¡Escribinos!
      </span>
    </a>
  );
};

export default WhatsAppButton;