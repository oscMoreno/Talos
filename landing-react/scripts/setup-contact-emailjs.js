#!/usr/bin/env node

/**
 * Configuración de EmailJS para formulario de contacto de Talos
 * Los emails llegarán directamente a taloslogos@gmail.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📧 Configuración de EmailJS para Formulario de Contacto - Talos');
console.log('================================================================\n');

// Verificar si existe .env
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
  console.log('❌ No se encontró archivo .env');
  console.log('Asegúrate de que existe el archivo .env en la raíz del proyecto\n');
  process.exit(1);
}

console.log('📋 PASOS PARA CONFIGURAR EMAILJS (Formulario de Contacto):');
console.log('===========================================================\n');

console.log('1️⃣ CREA TU CUENTA EN EMAILJS:');
console.log('   • Ve a: https://www.emailjs.com/');
console.log('   • Regístrate con tu email (puede ser taloslogos@gmail.com)');
console.log('   • Verifica tu cuenta\n');

console.log('2️⃣ CONFIGURA TU SERVICIO DE EMAIL:');
console.log('   • Ve a "Email Services"');
console.log('   • Agrega Gmail como servicio');
console.log('   • Autoriza el acceso a tu cuenta de Gmail');
console.log('   • El Service ID aparecerá automáticamente\n');

console.log('3️⃣ CREA EL TEMPLATE PARA CONTACTO:');
console.log('   • Ve a "Email Templates"');
console.log('   • Crea un nuevo template');
console.log('   • ID sugerido: template_contact_form\n');

console.log('4️⃣ CONTENIDO DEL TEMPLATE (copia exactamente):');
console.log('   Asunto: Nuevo mensaje de contacto - {{from_name}}\n');

try {
  const contactTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'templates', 'emailjs-contact-form.html'),
    'utf8'
  );
  console.log('   Contenido del email:');
  console.log('   ```');
  console.log(contactTemplate);
  console.log('   ```\n');
} catch (error) {
  console.log('   ❌ Error al leer el template de contacto\n');
}

console.log('5️⃣ CONFIGURA LOS PARÁMETROS DEL TEMPLATE:');
console.log('   • from_name: Nombre del remitente');
console.log('   • from_email: Email del remitente');
console.log('   • message: Mensaje del formulario');
console.log('   • to_email: taloslogos@gmail.com (tu email)');
console.log('   • current_date: Fecha actual\n');

console.log('6️⃣ OBTÉN TU USER ID:');
console.log('   • Ve a "Account" → "General"');
console.log('   • Copia tu "User ID"\n');

console.log('7️⃣ ACTUALIZA TU ARCHIVO .ENV:');
console.log('   Busca estas líneas y actualízalas con tus valores reales:\n');

console.log('   ```env');
console.log('   # EmailJS para formulario de contacto');
console.log('   REACT_APP_EMAILJS_SERVICE_ID=service_tu_service_id_real');
console.log('   REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form');
console.log('   REACT_APP_EMAILJS_USER_ID=tu_user_id_real_de_emailjs');
console.log('   ```\n');

console.log('8️⃣ VERIFICA LA CONFIGURACIÓN:');
console.log('   • npm run dev');
console.log('   • Ve al formulario de contacto');
console.log('   • Envía un mensaje de prueba');
console.log('   • Revisa tu bandeja de taloslogos@gmail.com\n');

console.log('🎯 RESULTADO ESPERADO:');
console.log('• Los emails del formulario llegan a: taloslogos@gmail.com');
console.log('• Los visitantes reciben confirmación de envío');
console.log('• No necesitas servidor backend');
console.log('• Funciona con cualquier hosting estático\n');

console.log('📧 EJEMPLO DE EMAIL QUE RECIBIRÁS:');
console.log('==================================\n');

console.log('Asunto: Nuevo mensaje de contacto - Juan Pérez\n');

console.log('Nuevo mensaje de contacto desde la página web de Talos\n');

console.log('Detalles del contacto:');
console.log('Nombre: Juan Pérez');
console.log('Email: juan@email.com');
console.log('Mensaje: Hola, me gustaría cotizar un logo para mi empresa...\n');

console.log('Fecha de envío: 05/12/2024, 14:30:25\n');

console.log('💡 NOTAS IMPORTANTES:');
console.log('• Los emails llegan a la bandeja principal de Gmail');
console.log('• EmailJS tiene límite gratuito de 200 emails/mes');
console.log('• Para más emails, considera actualizar a plan pago');
console.log('• Los emails aparecen como enviados desde tu Gmail\n');

console.log('🔧 CONFIGURACIÓN ACTUAL EN TU .ENV:');
console.log('====================================\n');

// Extraer variables de EmailJS del .env
const envContent = fs.readFileSync(envPath, 'utf8');
const emailjsVars = envContent.split('\n').filter(line =>
  line.includes('REACT_APP_EMAILJS_')
);

emailjsVars.forEach(line => {
  if (line.trim()) {
    const [key, value] = line.split('=');
    const status = value && value !== 'tu_user_id_emailjs' && !value.includes('your') ? '✅' : '❌';
    console.log(`${status} ${key}: ${value || 'NO CONFIGURADO'}`);
  }
});

console.log('\n🚀 ¡LISTO PARA FUNCIONAR!');
console.log('Una vez configurado, todos los mensajes del formulario');
console.log('llegarán directamente a taloslogos@gmail.com\n');

console.log('📞 ¿Necesitas ayuda con algún paso?');
console.log('Los pasos están numerados para facilitar la configuración.\n');