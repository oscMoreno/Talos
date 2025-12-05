# Sistema de Email Marketing para Solicitar Reseñas - Talos

Este documento explica cómo implementar y usar el sistema completo de email marketing para solicitar reseñas de clientes después de completar proyectos.

## 📧 **Visión General del Sistema**

El sistema automatiza el proceso de obtención de reseñas reales mediante:
- **Emails programados** 7 días después de completar un proyecto
- **Enlaces seguros** con tokens únicos para cada cliente
- **Formularios dedicados** para dejar reseñas
- **Sistema de gestión** para programar y enviar emails

**Nota:** Este sistema está diseñado para que manejes tus propios cuerpos de email y servicios de envío. No incluye integración con servicios específicos como EmailJS.

## 🏗️ **Arquitectura del Sistema**

### **Estructura de Archivos:**
```
src/
├── services/
│   └── emailService.js          # Servicio principal de emails
├── templates/
│   ├── reviewRequestEmail.html  # Plantilla email solicitud (ejemplo)
│   └── thankYouEmail.html       # Plantilla email agradecimiento (ejemplo)
├── components/
│   └── ReviewForm.jsx           # Formulario para reseñas
├── utils/
│   └── emailMarketing.js        # Utilidades y gestor de emails
└── data/
    └── content.js               # Datos de reseñas existentes
```

## 🚀 **Implementación Paso a Paso**

### **1. Configuración Inicial**

#### **Variables de Entorno (.env):**
```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TOKEN=your_api_token_here

# Email Service (elige tu proveedor preferido)
# SendGrid
REACT_APP_SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@talos-logos.com
FROM_NAME=Talos - Servicios de Creación de Logos

# O cualquier otro servicio de email que prefieras
# (ej: AWS SES, Mailgun, Postmark, etc.)
```

### **2. Backend API (Node.js + Express)**

#### **Instalación de dependencias:**
```bash
npm install express mongoose nodemailer @sendgrid/mail node-cron
```

#### **Servidor básico (server.js):**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/talos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Rutas
app.use('/api/email', emailRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
```

#### **Modelo de Testimonio (models/Testimonial.js):**
```javascript
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  project: { type: String },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  source: { type: String, enum: ['website', 'email'], default: 'website' }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
```

#### **Rutas de Email (routes/emailRoutes.js):**
```javascript
const express = require('express');
const sgMail = require('@sendgrid/mail');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Enviar email de solicitud de reseña
router.post('/send-review-request', async (req, res) => {
  try {
    const { to, from, subject, templateId, dynamicTemplateData } = req.body;

    const msg = {
      to,
      from: {
        email: from.email,
        name: from.name
      },
      subject,
      templateId,
      dynamicTemplateData
    };

    await sgMail.send(msg);
    res.json({ success: true, message: 'Email enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ error: 'Error al enviar email' });
  }
});

// Crear nueva reseña
router.post('/testimonials', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    // Enviar email de agradecimiento
    // ... código para enviar thank you email

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener reseñas aprobadas
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **3. Configuración de SendGrid**

#### **Crear plantillas en SendGrid:**
1. Ve a **Email API > Dynamic Templates**
2. Crea dos plantillas:
   - `review-request-template`
   - `thank-you-template`

#### **Contenido de la plantilla "review-request-template":**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Copia los estilos del archivo reviewRequestEmail.html */
    </style>
</head>
<body>
    <div class="container">
        <h2>¡Hola {{clientName}}!</h2>
        <p>Esperamos que estés satisfecho con tu proyecto de {{projectType}}.</p>
        <a href="{{reviewUrl}}" class="cta-button">Dejar mi Reseña ⭐</a>
        <p>¡Gracias!<br>Equipo Talos</p>
    </div>
</body>
</html>
```

### **4. Programación de Emails Automáticos**

#### **Usando el gestor de emails:**
```javascript
import { ReviewEmailManager } from './utils/emailMarketing';

// Inicializar el gestor
const emailManager = new ReviewEmailManager();

// Cuando se complete un proyecto
const projectData = {
  name: "María González",
  email: "maria@email.com",
  project: "Logo para empresa de tecnología"
};

// Programar email de seguimiento (7 días después)
emailManager.scheduleReviewRequest(projectData);

// Procesar emails pendientes (ejecutar cada hora)
setInterval(() => {
  emailManager.processPendingEmails();
}, 60 * 60 * 1000);
```

## 📊 **Dashboard de Administración**

### **Panel para gestionar reseñas:**
```javascript
// src/components/AdminDashboard.jsx
const AdminDashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchTestimonials();
    fetchEmailStats();
  }, []);

  const approveTestimonial = async (id) => {
    await fetch(`/api/testimonials/${id}/approve`, { method: 'PUT' });
    fetchTestimonials(); // Recargar lista
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración - Talos</h1>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Reseñas Pendientes</h3>
          <span>{stats.pendingReviews}</span>
        </div>
        <div className="stat-card">
          <h3>Emails Enviados</h3>
          <span>{stats.emailsSent}</span>
        </div>
        <div className="stat-card">
          <h3>Tasa de Respuesta</h3>
          <span>{stats.responseRate}%</span>
        </div>
      </div>

      {/* Lista de reseñas pendientes */}
      <div className="testimonials-list">
        {testimonials.map(testimonial => (
          <div key={testimonial._id} className="testimonial-item">
            <div className="testimonial-content">
              <h4>{testimonial.name}</h4>
              <div className="stars">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p>{testimonial.comment}</p>
            </div>
            <div className="testimonial-actions">
              <button onClick={() => approveTestimonial(testimonial._id)}>
                Aprobar
              </button>
              <button onClick={() => rejectTestimonial(testimonial._id)}>
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🎯 **Flujo Completo de Reseñas**

### **1. Cliente completa proyecto**
```javascript
// En el código cuando se marca proyecto como completado
const projectData = {
  name: client.name,
  email: client.email,
  project: project.type,
  completionDate: new Date()
};

await emailManager.scheduleReviewRequest(projectData);
```

### **2. Sistema envía email automático (7 días después)**
- Email personalizado con nombre del cliente
- Enlace único con token seguro
- Diseño profesional de Talos

### **3. Cliente hace clic en enlace y deja reseña**
- Formulario validado con estrellas interactivas
- Campo de comentario obligatorio
- Opción de recomendación

### **4. Sistema procesa reseña**
- Guarda en base de datos como "pendiente"
- Envía email de agradecimiento automático
- Ofrece descuento especial

### **5. Administrador aprueba reseña**
- Revisa contenido en panel de admin
- Aprueba o rechaza reseñas
- Publica reseñas aprobadas en sitio web

## 📈 **Métricas y Seguimiento**

### **KPIs importantes:**
- **Tasa de apertura** de emails
- **Tasa de clics** en enlaces
- **Tasa de conversión** (reseñas completadas)
- **Tasa de aprobación** de reseñas
- **NPS (Net Promoter Score)** basado en recomendaciones

### **Seguimiento con Google Analytics:**
```javascript
// Rastrear eventos de reseñas
gtag('event', 'review_submitted', {
  event_category: 'engagement',
  event_label: 'customer_review',
  value: rating
});
```

## 🔧 **Servicios de Email Recomendados**

Para implementar el envío de emails, puedes elegir cualquier servicio que prefieras:

### **Opciones Populares:**
- **SendGrid** - Profesional, confiable, buen precio
- **AWS SES** - Muy económico para altos volúmenes
- **Mailgun** - Buena API, fácil configuración
- **Postmark** - Excelente deliverability
- **Tu propio servidor SMTP** - Para máxima personalización

### **Ejemplo genérico de envío:**
```javascript
// Ejemplo con cualquier servicio de email
const sendReviewRequest = async (clientData) => {
  const emailData = {
    to: clientData.email,
    subject: `¡Hola ${clientData.name}! ¿Cómo estuvo tu proyecto?`,
    html: generateReviewEmailHTML(clientData),
    from: process.env.FROM_EMAIL
  };

  // Envía usando tu servicio preferido
  await emailService.send(emailData);
};
```

## 🚀 **Próximos Pasos**

1. **Configurar servidor backend** con Node.js
2. **Crear cuenta en SendGrid** y configurar plantillas
3. **Implementar panel de administración**
4. **Configurar dominio y emails profesionales**
5. **Probar el flujo completo** con un proyecto de prueba
6. **Monitorear métricas** y optimizar tasas de respuesta

## 💡 **Tips para Mejorar Tasas de Respuesta**

- **Personalización**: Usa el nombre del cliente en todos los emails
- **Timing óptimo**: 7 días después del proyecto completado
- **Incentivos**: Ofrece descuentos o beneficios especiales
- **Facilidad**: Formulario simple y rápido de completar
- **Seguimiento**: Email de recordatorio si no responden en 3 días

¿Te gustaría que implemente alguna parte específica del sistema backend o tienes preguntas sobre la configuración?