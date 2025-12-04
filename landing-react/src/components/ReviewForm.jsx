import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { sendThankYouEmail, validateReviewToken } from '../services/emailService';

const ReviewForm = () => {
  const [searchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    wouldRecommend: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const validatedData = validateReviewToken(token);
      if (validatedData) {
        setIsValidToken(true);
        setClientData({ email: validatedData.email });
      }
    }
  }, [searchParams]);

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí enviarías los datos a tu backend
      const reviewData = {
        ...formData,
        email: clientData.email,
        name: 'Cliente', // En producción, obtendrías esto del token o base de datos
        date: new Date().toISOString()
      };

      // Simular envío (en producción, esto iría a tu API)
      console.log('Reseña enviada:', reviewData);

      // Enviar email de agradecimiento
      await sendThankYouEmail({
        name: 'Cliente',
        email: clientData.email,
        comment: formData.comment,
        rating: formData.rating
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      alert('Hubo un error al enviar tu reseña. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-8 h-8 cursor-pointer ${
          index < formData.rating
            ? 'text-[#9747FF] fill-[#9747FF]'
            : 'text-[#CBD5E1] hover:text-[#9747FF]'
        }`}
        onClick={() => handleRatingChange(index + 1)}
      />
    ));
  };

  if (!isValidToken) {
    return (
      <section className="py-24 px-4 bg-[#F8FAFC] min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light text-[#0D0D12] mb-6">
            Enlace Inválido o Expirado
          </h1>
          <p className="text-[#374151] mb-8">
            El enlace para dejar tu reseña no es válido o ha expirado.
            Si crees que esto es un error, por favor contáctanos directamente.
          </p>
          <a
            href="/contact"
            className="bg-[#9747FF] text-[#F8FAFC] px-8 py-4 rounded-none font-medium hover:bg-[#8B3DFF] transition-colors duration-300 inline-block"
          >
            Contactar Soporte
          </a>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section className="py-24 px-4 bg-[#F8FAFC] min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-light text-[#0D0D12] mb-6">
            ¡Gracias por tu Reseña!
          </h1>
          <p className="text-[#374151] mb-8">
            Tu opinión es muy valiosa para nosotros. Hemos enviado un email de agradecimiento
            con un descuento especial para tu próximo proyecto.
          </p>
          <div className="bg-[#f0f9ff] border border-[#9747FF] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-[#0D0D12] mb-2">Tu Beneficio Especial:</h3>
            <p className="text-[#374151]">10% de descuento en tu próximo proyecto con Talos</p>
          </div>
          <a
            href="/"
            className="bg-[#9747FF] text-[#F8FAFC] px-8 py-4 rounded-none font-medium hover:bg-[#8B3DFF] transition-colors duration-300 inline-block"
          >
            Volver al Inicio
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 border border-[#CBD5E1] rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-[#0D0D12] mb-4">
              Comparte tu Experiencia
            </h1>
            <p className="text-[#374151]">
              Tu opinión nos ayuda a mejorar y a otros clientes a conocernos mejor.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-[#0D0D12] mb-4 font-medium text-center">
                ¿Cómo calificarías tu experiencia general?
              </label>
              <div className="flex justify-center space-x-2">
                {renderStars()}
              </div>
              <div className="text-center mt-2 text-[#6b7280]">
                {formData.rating} de 5 estrellas
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[#0D0D12] mb-4 font-medium">
                Cuéntanos tu experiencia
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300 h-32 resize-none"
                placeholder="¿Qué te pareció el proceso? ¿Estás satisfecho con el resultado? ¿Recomendarías nuestros servicios?"
                required
              />
            </div>

            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.wouldRecommend}
                  onChange={(e) => setFormData(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
                  className="mr-3 w-4 h-4 text-[#9747FF] focus:ring-[#9747FF] border-[#CBD5E1] rounded"
                />
                <span className="text-[#374151]">
                  Recomendaría los servicios de Talos a otros
                </span>
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#9747FF] text-[#F8FAFC] px-8 py-4 rounded-none font-medium hover:bg-[#8B3DFF] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-[#6b7280] text-sm">
            <p>Tu reseña será revisada antes de publicarse en nuestro sitio web.</p>
            <p className="mt-2">Tus datos personales serán tratados con confidencialidad.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;