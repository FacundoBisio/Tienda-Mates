// src/app/politica-de-privacidad/page.tsx — Server Component
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de FFMates. Cómo recopilamos, usamos y protegemos tus datos personales, y qué derechos tenés sobre ellos.',
  alternates: { canonical: 'https://tienda-mates.vercel.app/politica-de-privacidad' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '22 de abril de 2026';

export default function PoliticaPrivacidadPage() {
  return (
    <div className="container mx-auto px-6 py-12 pt-32 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-[#3C503A] mb-2 border-b-2 border-orange-200 pb-4">
        Política de Privacidad
      </h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: {LAST_UPDATED}</p>

      <div className="prose prose-orange max-w-none text-gray-700">
        <p className="mb-4">
          En <strong className="text-[#7F997C]">FFMates</strong> (en adelante, &ldquo;nosotros&rdquo; o &ldquo;la tienda&rdquo;) respetamos tu privacidad
          y nos comprometemos a proteger los datos personales que nos confiás. Esta política describe qué
          información recopilamos, para qué la usamos, cómo la protegemos y qué derechos tenés como usuario.
        </p>
        <p className="mb-4">
          Al navegar este sitio o realizar una consulta aceptás los términos de esta política. Si no estás
          de acuerdo con alguno de los puntos, te pedimos que no utilices el sitio.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">1. Responsable del tratamiento</h3>
        <p className="mb-4">
          FFMates — tienda de mates artesanales con sede en Córdoba, Argentina.
          Contacto: <a href="https://wa.me/5493513662570" className="text-[#7F997C] underline hover:text-[#3C503A]">WhatsApp +54 9 351 366-2570</a>
          {' '}o por Instagram <a href="https://www.instagram.com/ff.mates/" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">@ff.mates</a>.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">2. Información que recopilamos</h3>
        <p className="mb-2">Recopilamos únicamente los datos estrictamente necesarios para prestar el servicio:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Datos de contacto</strong>: nombre, número de teléfono y, si lo proveés, correo electrónico.</li>
          <li><strong>Datos de envío</strong>: dirección postal y localidad, únicamente cuando coordines una compra.</li>
          <li><strong>Datos de navegación</strong>: dirección IP, tipo de dispositivo, navegador, páginas visitadas y tiempo de permanencia, recolectados de forma agregada por Google Analytics.</li>
          <li><strong>Preferencias locales</strong>: productos guardados en carrito y favoritos, almacenados exclusivamente en tu navegador (<code>localStorage</code>). No viajan a nuestros servidores.</li>
        </ul>
        <p className="mb-4">
          <strong>No recopilamos ni almacenamos datos de tarjetas de crédito ni contraseñas bancarias.</strong>
          Todos los pagos se coordinan fuera del sitio (transferencia o efectivo) por WhatsApp.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">3. Finalidad del uso</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Procesar tu consulta o pedido y coordinar envío y pago.</li>
          <li>Responder dudas por WhatsApp, email o redes sociales.</li>
          <li>Mejorar la experiencia del sitio mediante estadísticas agregadas.</li>
          <li>Cumplir con obligaciones legales aplicables.</li>
        </ul>
        <p className="mb-4">
          <strong>No usamos tus datos para enviar publicidad no solicitada</strong> ni los compartimos,
          vendemos ni alquilamos a terceros con fines comerciales.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">4. Cookies y tecnologías de terceros</h3>
        <p className="mb-2">El sitio utiliza cookies propias y de terceros para las siguientes finalidades:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Cookies técnicas</strong>: necesarias para el funcionamiento del carrito y la sesión. No requieren consentimiento.</li>
          <li><strong>Google Analytics (GA4)</strong>: mide tráfico de forma anónima y agregada. Podés desactivarlo instalando el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">complemento oficial de inhabilitación</a>.</li>
          <li><strong>Google AdSense</strong>: puede utilizar cookies para mostrar anuncios relevantes. Podés gestionar tus preferencias en <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">Configuración de anuncios de Google</a>.</li>
        </ul>
        <p className="mb-4">
          Podés bloquear o eliminar cookies desde la configuración de tu navegador. Tené en cuenta que
          algunas funciones del sitio (como el carrito) pueden verse afectadas.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">5. Conservación de los datos</h3>
        <p className="mb-4">
          Conservamos tus datos de contacto sólo por el tiempo necesario para gestionar tu pedido y
          cumplir obligaciones legales (facturación, garantía). Los datos de navegación agregados
          permanecen según la política de retención de Google Analytics.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">6. Seguridad</h3>
        <p className="mb-4">
          Implementamos medidas técnicas razonables para proteger tus datos: conexión cifrada HTTPS,
          credenciales administrativas con hash y acceso restringido al panel de administración.
          Ningún sistema es 100% seguro, pero trabajamos para minimizar riesgos.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">7. Tus derechos</h3>
        <p className="mb-2">
          Conforme a la Ley 25.326 de Protección de Datos Personales (Argentina), tenés derecho a:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Acceder</strong> a los datos personales que tengamos sobre vos.</li>
          <li><strong>Rectificar</strong> datos inexactos o desactualizados.</li>
          <li><strong>Suprimir</strong> tus datos cuando ya no sean necesarios.</li>
          <li><strong>Oponerte</strong> a determinados tratamientos.</li>
        </ul>
        <p className="mb-4">
          Para ejercer cualquiera de estos derechos, contactanos por
          {' '}<a href="https://wa.me/5493513662570" className="text-[#7F997C] underline hover:text-[#3C503A]">WhatsApp</a>.
          Respondemos en un plazo máximo de 10 días hábiles.
        </p>
        <p className="mb-4 text-sm">
          La autoridad de control en Argentina es la{' '}
          <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">
            Agencia de Acceso a la Información Pública (AAIP)
          </a>, ante la que podés presentar reclamos.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">8. Menores de edad</h3>
        <p className="mb-4">
          El sitio está dirigido a mayores de 18 años. No recopilamos conscientemente datos de menores;
          si detectás que un menor nos ha enviado información, contactanos y la eliminaremos.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">9. Cambios en esta política</h3>
        <p className="mb-4">
          Podemos actualizar esta política para reflejar cambios legales o mejoras del servicio.
          Publicaremos la nueva versión en esta misma URL con su fecha de actualización.
          Te recomendamos revisarla periódicamente.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">10. Contacto</h3>
        <p className="mb-8">
          Ante cualquier duda sobre esta política o sobre el tratamiento de tus datos, escribinos por
          {' '}<a href="https://wa.me/5493513662570" className="text-[#7F997C] underline hover:text-[#3C503A]">WhatsApp</a>
          {' '}o <a href="https://www.instagram.com/ff.mates/" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">Instagram</a>.
        </p>

        <Link href="/" className="inline-block bg-[#7F997C] text-[#3C503A] px-6 py-2 rounded-lg hover:bg-[#7F997C]/60 transition font-semibold">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
