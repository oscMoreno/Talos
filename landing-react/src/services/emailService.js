// Servicio de Email Marketing para Solicitar Reseñas
// Este servicio maneja el envío de emails de seguimiento para solicitar reseñas

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configuración de SendGrid (ejemplo)
// Para producción, configura tu API key en variables de entorno
const SENDGRID_API_KEY = process.env.REACT_APP_SENDGRID_API_KEY;
const FROM_EMAIL = 'noreply@talos-logos.com';
const FROM_NAME = 'Talos - Servicios de Creación de Logos';

/**
 * Envía un email de solicitud de reseña
 * @param {Object} clientData - Datos del cliente
 * @param {string} clientData.name - Nombre del cliente
 * @param {string} clientData.email - Email del cliente
 * @param {string} clientData.project - Tipo de proyecto completado
 * @param {Date} clientData.completionDate - Fecha de finalización del proyecto
 */
export const sendReviewRequestEmail = async (clientData) => {
  try {
    const emailData = {
      to: clientData.email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: `¡${clientData.name}! ¿Cómo te fue con tu proyecto de logo?`,
      templateId: 'review-request-template', // ID de plantilla en SendGrid
      dynamicTemplateData: {
        clientName: clientData.name,
        projectType: clientData.project,
        reviewUrl: `${window.location.origin}/review?token=${generateReviewToken(clientData)}`,
        companyName: 'Talos'
      }
    };

    const response = await fetch(`${API_BASE_URL}/email/send-review-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Error al enviar el email de solicitud de reseña');
    }

    const result = await response.json();
    console.log('Email de solicitud de reseña enviado:', result);

    return result;
  } catch (error) {
    console.error('Error en sendReviewRequestEmail:', error);
    throw error;
  }
};

/**
 * Envía email de agradecimiento por la reseña
 * @param {Object} reviewData - Datos de la reseña
 */
export const sendThankYouEmail = async (reviewData) => {
  try {
    const emailData = {
      to: reviewData.email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: '¡Gracias por tu reseña! - Talos',
      templateId: 'thank-you-template',
      dynamicTemplateData: {
        clientName: reviewData.name,
        reviewText: reviewData.comment,
        rating: reviewData.rating,
        companyName: 'Talos'
      }
    };

    const response = await fetch(`${API_BASE_URL}/email/send-thank-you`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Error al enviar el email de agradecimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en sendThankYouEmail:', error);
    throw error;
  }
};

/**
 * Programa envío de email de seguimiento (7 días después de completar proyecto)
 * @param {Object} projectData - Datos del proyecto completado
 */
export const scheduleFollowUpEmail = async (projectData) => {
  try {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + 7); // 7 días después

    const scheduledEmail = {
      type: 'review_request',
      clientData: projectData,
      scheduledDate: followUpDate.toISOString(),
      status: 'scheduled'
    };

    const response = await fetch(`${API_BASE_URL}/email/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
      },
      body: JSON.stringify(scheduledEmail)
    });

    if (!response.ok) {
      throw new Error('Error al programar email de seguimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en scheduleFollowUpEmail:', error);
    throw error;
  }
};

/**
 * Genera un token único para el enlace de reseña
 * @param {Object} clientData - Datos del cliente
 * @returns {string} Token único
 */
const generateReviewToken = (clientData) => {
  // En producción, usa una librería como crypto para generar tokens seguros
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2);
  return btoa(`${clientData.email}-${timestamp}-${randomString}`);
};

/**
 * Valida un token de reseña
 * @param {string} token - Token a validar
 * @returns {Object|null} Datos del cliente si el token es válido
 */
export const validateReviewToken = (token) => {
  try {
    const decoded = atob(token);
    const [email, timestamp, randomString] = decoded.split('-');

    // Verificar que el token no haya expirado (24 horas)
    const tokenTime = parseInt(timestamp);
    const currentTime = Date.now();
    const hoursDiff = (currentTime - tokenTime) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return null; // Token expirado
    }

    return { email, timestamp, randomString };
  } catch (error) {
    console.error('Error al validar token:', error);
    return null;
  }
};

/**
 * Envía email usando alternativa gratuita (EmailJS)
 * Para proyectos pequeños sin necesidad de servidor backend
 */
export const sendReviewRequestWithEmailJS = async (clientData) => {
  // Configuración de EmailJS (alternativa gratuita)
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_REVIEW_TEMPLATE_ID;
  const userId = process.env.REACT_APP_EMAILJS_USER_ID;

  const templateParams = {
    to_email: clientData.email,
    client_name: clientData.name,
    project_type: clientData.project,
    review_link: `${window.location.origin}/review?token=${generateReviewToken(clientData)}`,
    from_name: 'Talos - Servicios de Creación de Logos'
  };

  try {
    // Aquí iría la llamada a EmailJS
    // await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('Email enviado via EmailJS (simulado):', templateParams);
    return { success: true, message: 'Email enviado exitosamente' };
  } catch (error) {
    console.error('Error al enviar email via EmailJS:', error);
    throw error;
  }
};