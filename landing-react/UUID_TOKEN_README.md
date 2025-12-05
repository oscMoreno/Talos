# 🔐 Sistema de Tokens API con UUID v4 (RFC4122) - Talos

Este documento explica la implementación completa del sistema de generación y gestión de tokens API seguros usando UUID v4 compliant con el estándar RFC4122.

## 📋 **Resumen del Sistema**

- **Librería**: `uuid` v4 (RFC4122 compliant)
- **Propósito**: Generar tokens API únicos y seguros
- **Uso**: Autenticación de APIs y servicios backend
- **Seguridad**: 128 bits de entropía aleatoria

## 🏗️ **Arquitectura del Sistema**

### **Estructura de Archivos:**
```
src/
├── utils/
│   └── tokenGenerator.js     # Utilidades principales de tokens
├── scripts/
│   └── generate-api-token.js # Script de línea de comandos
├── components/
│   └── TokenDemo.jsx         # Componente de demostración
└── .env                      # Variables de entorno (generado)
```

## 🚀 **Instalación y Configuración**

### **1. Instalar Dependencias:**
```bash
npm install uuid
```

### **2. Generar Token Inicial:**
```bash
# Opción 1: Usando npm script
npm run generate-token

# Opción 2: Ejecutando directamente
node scripts/generate-api-token.js
```

### **3. Verificar Configuración:**
El script automáticamente:
- ✅ Genera un UUID v4 válido
- ✅ Actualiza el archivo `.env`
- ✅ Reinicia el servidor de desarrollo
- ✅ Muestra información del token generado

## 🔑 **Uso del Token en la Aplicación**

### **Acceder al Token:**
```javascript
// En cualquier componente o servicio
const apiToken = process.env.REACT_APP_API_TOKEN;

// Verificar que existe
if (!apiToken) {
  console.error('REACT_APP_API_TOKEN no está configurado');
}
```

### **Usar en Headers de API:**
```javascript
// Ejemplo con fetch
const response = await fetch('/api/testimonials', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`
  },
  body: JSON.stringify(data)
});
```

### **Usar en Axios:**
```javascript
import axios from 'axios';

// Configurar interceptor global
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
```

## 🛠️ **API de Utilidades**

### **Funciones Principales:**

#### **`generateSecureApiToken()`**
```javascript
import { generateSecureApiToken } from './utils/tokenGenerator';

const token = generateSecureApiToken();
// Retorna: "da24255b-3226-46c3-9168-7e2d78a3201e"
```

#### **`isValidUUID(token)`**
```javascript
import { isValidUUID } from './utils/tokenGenerator';

const isValid = isValidUUID('da24255b-3226-46c3-9168-7e2d78a3201e');
// Retorna: true
```

#### **`getTokenInfo(token)`**
```javascript
import { getTokenInfo } from './utils/tokenGenerator';

const info = getTokenInfo('da24255b-3226-46c3-9168-7e2d78a3201e');
// Retorna:
// {
//   token: "da24255b-3226-46c3-9168-7e2d78a3201e",
//   isValid: true,
//   length: 36,
//   version: "4",
//   standard: "RFC4122"
// }
```

## 📊 **Información Técnica del UUID v4**

### **Formato RFC4122:**
```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Donde:
- `x`: Cualquier dígito hexadecimal (0-9, a-f)
- `4`: Versión del UUID (siempre 4 para v4)
- `y`: Variant (8, 9, A, o B)

### **Ejemplo de Token Generado:**
```
Token: da24255b-3226-46c3-9168-7e2d78a3201e
Versión: 4 (Random)
Variante: RFC 4122
Longitud: 36 caracteres
Entropía: 128 bits
```

### **Probabilidad de Colisión:**
- **Teórica**: 1 en 2^128 (aprox. 3.4 × 10^38)
- **Práctica**: Considerada única para todos los propósitos prácticos

## 🔒 **Mejores Prácticas de Seguridad**

### **1. Gestión de Tokens:**
```bash
# Generar nuevo token cuando sea necesario
npm run generate-token

# Nunca commitear tokens reales
echo ".env" >> .gitignore
```

### **2. Rotación de Tokens:**
- 🔄 Rota tokens cada 3-6 meses
- 🔄 Inmediatamente si hay sospecha de compromiso
- 🔄 Usa diferentes tokens para diferentes entornos

### **3. Validación en Backend:**
```javascript
// En tu servidor API
const validateApiToken = (token) => {
  const validTokens = process.env.VALID_API_TOKENS.split(',');
  return validTokens.includes(token);
};
```

### **4. Monitoreo de Uso:**
- 📊 Registra intentos de acceso con tokens inválidos
- 📊 Monitorea frecuencia de uso de tokens
- 📊 Implementa rate limiting por token

## 🎯 **Casos de Uso en Talos**

### **1. Sistema de Email Marketing:**
```javascript
// Enviar emails con autenticación
const sendReviewEmail = async (clientData) => {
  const response = await fetch(`${API_BASE_URL}/email/send-review-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
    },
    body: JSON.stringify(emailData)
  });
};
```

### **2. API de Testimonios:**
```javascript
// Crear nuevo testimonio
const submitTestimonial = async (testimonialData) => {
  const response = await fetch('/api/testimonials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
    },
    body: JSON.stringify(testimonialData)
  });
};
```

### **3. Dashboard Administrativo:**
```javascript
// Acceder a datos administrativos
const fetchAdminData = async () => {
  const response = await fetch('/api/admin/stats', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
    }
  });
};
```

## 🧪 **Testing y Desarrollo**

### **Componente de Demostración:**
```javascript
// src/components/TokenDemo.jsx - Para testing
import TokenDemo from './components/TokenDemo';

// En desarrollo, puedes mostrar el componente para verificar tokens
{process.env.NODE_ENV === 'development' && <TokenDemo />}
```

### **Scripts de Testing:**
```bash
# Generar token de desarrollo (no usar en producción)
npm run generate-token -- --dev

# Generar múltiples tokens para testing
node scripts/generate-api-token.js --count 5

# Validar token existente
node -e "import('./src/utils/tokenGenerator.js').then(m => console.log(m.isValidUUID(process.env.REACT_APP_API_TOKEN)))"
```

## 🚨 **Solución de Problemas**

### **Token no se carga:**
```bash
# Verificar que el .env existe
ls -la .env

# Reiniciar el servidor de desarrollo
npm run dev

# Verificar que Vite está cargando las variables
console.log('Token:', import.meta.env.VITE_API_TOKEN);
```

### **Token inválido:**
```bash
# Generar nuevo token
npm run generate-token

# Verificar formato UUID
node -e "import('./src/utils/tokenGenerator.js').then(m => console.log(m.getTokenInfo(process.env.REACT_APP_API_TOKEN)))"
```

### **Error de CORS en desarrollo:**
```javascript
// En vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

## 📚 **Recursos Adicionales**

### **Documentación Oficial:**
- [RFC4122 - UUID Standard](https://tools.ietf.org/html/rfc4122)
- [UUID npm Package](https://www.npmjs.com/package/uuid)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)

### **Lecturas Recomendadas:**
- [UUID Best Practices](https://tools.ietf.org/html/rfc4122#section-4.4)
- [API Security Best Practices](https://tools.ietf.org/html/rfc8725)
- [JWT vs API Keys vs UUID Tokens](https://tools.ietf.org/html/rfc8725)

## 🎉 **¡Sistema Implementado!**

Tu aplicación Talos ahora cuenta con un sistema robusto de tokens API usando UUID v4 compliant con RFC4122, proporcionando:

- 🔐 **Seguridad máxima** con 128 bits de entropía
- 🛡️ **Autenticación robusta** para tus APIs
- 🔄 **Fácil rotación** de tokens cuando sea necesario
- 📊 **Monitoreo completo** del uso de tokens
- 🧪 **Testing simplificado** con herramientas de desarrollo

¿Te gustaría implementar alguna funcionalidad adicional o tienes preguntas sobre el sistema de tokens?