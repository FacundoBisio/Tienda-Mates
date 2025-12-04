// src/components/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-gray-800 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-[#692904]">Política de Privacidad</h1>
      
      <p className="mb-4">
        En <strong>FFMates</strong>, accesible desde nuestra web, una de nuestras prioridades principales es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que se recopila y registra por FFMates y cómo la usamos.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">Cookies y Web Beacons</h2>
      <p className="mb-4">
        Como cualquier otro sitio web, FFMates utiliza 'cookies'. Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador de los visitantes y/u otra información.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">Google DoubleClick DART Cookie</h2>
      <p className="mb-4">
        Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio en función de su visita a este y a otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies DART visitando la Política de privacidad de la red de contenido y anuncios de Google.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">Políticas de privacidad de terceros</h2>
      <p className="mb-4">
        La Política de Privacidad de FFMates no se aplica a otros anunciantes o sitios web. Por lo tanto, le recomendamos que consulte las respectivas Políticas de Privacidad de estos servidores de anuncios de terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones sobre cómo optar por no participar en ciertas opciones.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">Consentimiento</h2>
      <p className="mb-4">
        Al utilizar nuestro sitio web, por la presente acepta nuestra Política de Privacidad y acepta sus términos y condiciones.
      </p>
    </section>
  );
};

export default PrivacyPolicy;