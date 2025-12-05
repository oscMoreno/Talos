import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Configurar EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;

      // Verificar configuración
      const missingConfig = [];
      if (!serviceId || serviceId === 'service_contact_form') missingConfig.push('Service ID');
      if (!templateId) missingConfig.push('Template ID');
      if (!userId || userId === 'tu_user_id_emailjs') missingConfig.push('User ID');

      if (missingConfig.length > 0) {
        throw new Error(`Configuración incompleta. Faltan: ${missingConfig.join(', ')}. Ejecuta: npm run setup-contact-emailjs`);
      }

      // Preparar datos del template
      const templateParams = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        message: formData.message,
        current_date: new Date().toLocaleString('es-ES')
      };

      // Enviar email
      await emailjs.send(serviceId, templateId, templateParams, userId);

      setSubmitStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });

    } catch (error) {
      console.error('Error al enviar email:', error);

      // Mostrar el error real para debugging
      let errorMessage = 'Error al enviar el mensaje: ' + (error.text || error.message || 'Error desconocido');

      setSubmitStatus('error');
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-center mb-12 text-[#0D0D12]">
          Contáctanos
        </h2>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ ¡Mensaje enviado exitosamente! Te responderemos pronto.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ Error al enviar el mensaje. Por favor, intenta nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 border border-[#CBD5E1]">
          <div className="mb-6">
            <label className="block text-[#0D0D12] mb-2 font-medium">Nombre</label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300"
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#0D0D12] mb-2 font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300"
              placeholder="tu@email.com"
            />
          </div>
          <div className="mb-8">
            <label className="block text-[#0D0D12] mb-2 font-medium">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300 h-32 resize-none"
              placeholder="Cuéntanos sobre tu proyecto..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#9747FF] text-[#F8FAFC] py-4 font-medium hover:bg-[#8B3DFF] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;