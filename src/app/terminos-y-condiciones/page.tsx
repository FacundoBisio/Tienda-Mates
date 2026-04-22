// src/app/terminos-y-condiciones/page.tsx — Server Component
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de FFMates: compras, envíos, cambios, devoluciones y garantía.',
  alternates: { canonical: 'https://tienda-mates.vercel.app/terminos-y-condiciones' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '22 de abril de 2026';

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-6 py-12 pt-32 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-[#3C503A] mb-2 border-b-2 border-orange-200 pb-4">
        Términos y Condiciones
      </h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: {LAST_UPDATED}</p>

      <div className="prose prose-orange max-w-none text-gray-700">
        <p className="mb-4">
          Bienvenido a <strong className="text-[#7F997C]">FFMates</strong>. Al navegar, consultar o comprar en
          este sitio aceptás los presentes términos y condiciones. Te pedimos que los leas atentamente.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">1. Objeto</h3>
        <p className="mb-4">
          Este sitio ofrece mates artesanales, bombillas, termos, yerbas y accesorios. Las compras se
          gestionan de forma personalizada por WhatsApp: el sitio funciona como catálogo y asistente de
          consulta, no como pasarela de pago.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">2. Precios y disponibilidad</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Todos los precios están expresados en pesos argentinos (ARS) e incluyen IVA cuando corresponda.</li>
          <li>Los precios pueden modificarse sin aviso previo. El precio válido es el confirmado al momento de cerrar la compra por WhatsApp.</li>
          <li>La disponibilidad está sujeta a stock. En caso de quiebre de stock te lo informaremos antes de confirmar el pedido.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">3. Medios de pago</h3>
        <p className="mb-4">
          Aceptamos transferencia bancaria y efectivo. El pago se coordina por WhatsApp antes del envío.
          No almacenamos datos de tarjetas ni credenciales bancarias.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">4. Envíos</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Realizamos envíos a todo el territorio argentino.</li>
          <li>El costo del envío se cotiza por WhatsApp según localidad y se suma al total.</li>
          <li>Los tiempos estimados de entrega son 3 a 7 días hábiles, sujetos al servicio de correo o transporte contratado.</li>
          <li>La responsabilidad de FFMates finaliza al entregar el paquete al correo/transporte. Ante demoras o extravíos mediamos con la empresa de logística, pero no nos hacemos cargo de plazos ajenos a nuestra operación.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">5. Cambios y devoluciones</h3>
        <p className="mb-2">
          Conforme a la Ley 24.240 de Defensa del Consumidor, contás con un plazo de <strong>10 días corridos</strong>{' '}
          desde la recepción del producto para ejercer el derecho de arrepentimiento.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>El producto debe estar sin uso, en su embalaje original y en perfecto estado.</li>
          <li>Los costos de envío del retorno corren por cuenta del comprador, salvo defecto de fabricación.</li>
          <li>El reintegro se realiza por el mismo medio de pago utilizado, en un plazo máximo de 10 días hábiles desde la recepción y verificación del producto.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">6. Garantía</h3>
        <p className="mb-4">
          Todos los productos cuentan con garantía de <strong>30 días</strong> por defectos de fabricación.
          Los mates de calabaza son piezas naturales: pequeñas variaciones de color, veta o forma son
          propias del material y no constituyen defecto. El curado inadecuado o el uso de agua hirviendo
          invalidan la garantía.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">7. Propiedad intelectual</h3>
        <p className="mb-4">
          Las fotografías, textos, logos y diseños del sitio son propiedad de FFMates. Está prohibida su
          reproducción o uso comercial sin autorización expresa.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">8. Limitación de responsabilidad</h3>
        <p className="mb-4">
          FFMates no se responsabiliza por daños derivados del uso indebido de los productos
          (calentamiento en microondas, golpes, contacto con fuego directo, etc.) ni por interrupciones
          temporales del servicio del sitio por mantenimiento o causas ajenas.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">9. Ley aplicable y jurisdicción</h3>
        <p className="mb-4">
          Estos términos se rigen por las leyes de la República Argentina. Ante cualquier controversia,
          las partes se someten a los tribunales ordinarios de la ciudad de Córdoba, con renuncia
          expresa a cualquier otro fuero.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">10. Modificaciones</h3>
        <p className="mb-4">
          FFMates puede modificar estos términos en cualquier momento. La versión vigente será siempre
          la publicada en esta URL con su correspondiente fecha de actualización.
        </p>

        <h3 className="text-xl font-bold text-[#3C503A] mt-6 mb-2">11. Contacto</h3>
        <p className="mb-8">
          Ante cualquier consulta escribinos por{' '}
          <a href="https://wa.me/5493513662570" className="text-[#7F997C] underline hover:text-[#3C503A]">WhatsApp</a>
          {' '}o{' '}
          <a href="https://www.instagram.com/ff.mates/" target="_blank" rel="noreferrer" className="text-[#7F997C] underline hover:text-[#3C503A]">Instagram</a>.
        </p>

        <Link href="/" className="inline-block bg-[#7F997C] text-[#3C503A] px-6 py-2 rounded-lg hover:bg-[#7F997C]/60 transition font-semibold">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
