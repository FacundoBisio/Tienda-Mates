// components/EmailModal.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';

export const EmailModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitting(true);

    emailjs
      .sendForm(
        'service_6hbsw38',       // Reemplazá con tu Service ID
        'template_83jly6d',      // Reemplazá con tu Template ID
        formRef.current,
        'u9_L4FCrA1Fx6qAHn'       // Reemplazá con tu Public Key
      )
      .then(() => {
        formRef.current.reset();
        setShowModal(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000); // Oculta la alerta a los 4s
      })
      .catch((error) => {
        console.error('Error al enviar:', error);
        alert('Error al enviar. Intentalo de nuevo.');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
      >
        Mandar un mensaje
      </button>

      {/* Alerta tipo toast */}
      {showAlert && (
        <div className="fixed top-6 right-6 z-[60] bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>¡Mensaje enviado con éxito!</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-6 relative scale-95 animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Nuevo mensaje</h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="user_name" className="block font-medium mb-1">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  placeholder="name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="user_email" className="block font-medium mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder="name@example.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium mb-1">
                  Mensaje:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="escribinos un mensaje..."
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailModal;
