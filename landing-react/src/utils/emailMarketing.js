// Utilidades para Email Marketing y Gestión de Reseñas

/**
 * Clase principal para gestionar el email marketing de reseñas
 */
export class ReviewEmailManager {
  constructor() {
    this.pendingEmails = [];
    this.sentEmails = [];
  }

  /**
   * Programa el envío de un email de solicitud de reseña
   * @param {Object} projectData - Datos del proyecto completado
   */
  async scheduleReviewRequest(projectData) {
    try {
      const scheduledEmail = {
        id: this.generateId(),
        type: 'review_request',
        clientData: projectData,
        scheduledDate: this.addDays(new Date(), 7), // 7 días después
        status: 'scheduled',
        createdAt: new Date()
      };

      // En producción, guardar en base de datos
      this.pendingEmails.push(scheduledEmail);

      console.log('Email de reseña programado:', scheduledEmail);
      return scheduledEmail;
    } catch (error) {
      console.error('Error al programar email:', error);
      throw error;
    }
  }

  /**
   * Procesa emails pendientes (llamar desde un cron job o scheduler)
   */
  async processPendingEmails() {
    const now = new Date();
    const emailsToSend = this.pendingEmails.filter(
      email => email.scheduledDate <= now && email.status === 'scheduled'
    );

    for (const email of emailsToSend) {
      try {
        await this.sendReviewRequestEmail(email.clientData);
        email.status = 'sent';
        email.sentAt = new Date();
        this.sentEmails.push(email);
        this.pendingEmails = this.pendingEmails.filter(e => e.id !== email.id);
      } catch (error) {
        console.error('Error al enviar email programado:', error);
        email.status = 'failed';
        email.error = error.message;
      }
    }
  }

  /**
   * Envía email de solicitud de reseña (implementación básica)
   */
  async sendReviewRequestEmail(clientData) {
    // Aquí implementarías la llamada real a tu servicio de email
    console.log('Enviando email de solicitud de reseña a:', clientData.email);

    // Simular envío
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          messageId: this.generateId(),
          recipient: clientData.email
        });
      }, 1000);
    });
  }

  /**
   * Obtiene estadísticas de emails enviados
   */
  getEmailStats() {
    const totalSent = this.sentEmails.length;
    const totalPending = this.pendingEmails.length;
    const responseRate = 0; // Calcular basado en reseñas recibidas

    return {
      totalSent,
      totalPending,
      responseRate,
      emailsByStatus: {
        sent: totalSent,
        pending: totalPending,
        failed: this.pendingEmails.filter(e => e.status === 'failed').length
      }
    };
  }

  /**
   * Utilidades helper
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

/**
 * Función para inicializar el sistema de email marketing
 * Llamar esta función cuando se complete un proyecto
 */
export const initializeReviewEmailSystem = () => {
  const emailManager = new ReviewEmailManager();

  // Configurar procesamiento automático cada hora
  setInterval(() => {
    emailManager.processPendingEmails();
  }, 60 * 60 * 1000); // Cada hora

  return emailManager;
};

/**
 * Plantilla de email de seguimiento (versión de texto plano para fallback)
 */
export const getReviewRequestEmailTemplate = (clientData) => {
  return {
    subject: `¡${clientData.name}! ¿Cómo te fue con tu proyecto de logo?`,
    text: `
Hola ${clientData.name},

Esperamos que estés satisfecho con tu proyecto de ${clientData.project} que completamos recientemente.

¿Nos ayudarías con una reseña rápida? Solo toma 2 minutos y significa mucho para nosotros.

Deja tu reseña aquí: ${window.location.origin}/review?token=${generateReviewToken(clientData)}

¡Gracias por elegir Talos!

Equipo Talos
Servicios de Creación de Logos
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>¡Hola ${clientData.name}!</h2>
        <p>Esperamos que estés satisfecho con tu proyecto de ${clientData.project}.</p>
        <p>¿Nos ayudarías con una reseña rápida?</p>
        <a href="${window.location.origin}/review?token=${generateReviewToken(clientData)}"
           style="background: #9747FF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Dejar mi Reseña
        </a>
        <p>¡Gracias!<br>Equipo Talos</p>
      </div>
    `
  };
};

/**
 * Genera token único para reseñas (implementación simple)
 */
const generateReviewToken = (clientData) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2);
  return btoa(`${clientData.email}-${timestamp}-${randomString}`);
};

/**
 * Valida token de reseña
 */
export const validateReviewToken = (token) => {
  try {
    const decoded = atob(token);
    const [email, timestamp] = decoded.split('-');

    // Verificar expiración (24 horas)
    const tokenTime = parseInt(timestamp);
    const currentTime = Date.now();
    const hoursDiff = (currentTime - tokenTime) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return null;
    }

    return { email, timestamp };
  } catch (error) {
    return null;
  }
};

/**
 * Ejemplo de uso del sistema:
 *
 * import { initializeReviewEmailSystem } from './utils/emailMarketing';
 *
 * // Inicializar el sistema
 * const emailManager = initializeReviewEmailSystem();
 *
 * // Cuando se complete un proyecto
 * const projectData = {
 *   name: "María González",
 *   email: "maria@email.com",
 *   project: "Logo para empresa de tecnología"
 * };
 *
 * emailManager.scheduleReviewRequest(projectData);
 */