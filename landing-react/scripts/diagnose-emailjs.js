#!/usr/bin/env node

/**
 * Diagnóstico de configuración EmailJS
 * Verifica qué está mal configurado y da soluciones específicas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 DIAGNÓSTICO DE EMAILJS - TALOS');
console.log('==================================\n');

// Leer archivo .env
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
  console.log('❌ No se encontró archivo .env');
  console.log('Asegúrate de que existe el archivo .env en la raíz del proyecto\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

console.log('📋 VERIFICANDO CONFIGURACIÓN ACTUAL:');
console.log('=====================================\n');

// Verificar cada variable de EmailJS
const emailjsVars = {
  'REACT_APP_EMAILJS_SERVICE_ID': {
    current: null,
    expected: 'service_[tu_id_real]',
    description: 'ID del servicio de email (Gmail) en EmailJS'
  },
  'REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID': {
    current: null,
    expected: 'template_contact_form',
    description: 'ID del template para formulario de contacto'
  },
  'REACT_APP_EMAILJS_USER_ID': {
    current: null,
    expected: '[tu_user_id_real]',
    description: 'Tu User ID personal de EmailJS'
  }
};

// Extraer valores actuales
envLines.forEach(line => {
  if (line.trim() && line.includes('=')) {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();

    if (emailjsVars[key]) {
      emailjsVars[key].current = value;
    }
  }
});

// Mostrar diagnóstico
let allConfigured = true;

Object.entries(emailjsVars).forEach(([key, config]) => {
  const isConfigured = config.current &&
                      config.current !== 'your_' + key.toLowerCase().replace('react_app_emailjs_', '') &&
                      config.current !== 'tu_' + key.toLowerCase().replace('react_app_emailjs_', '') &&
                      !config.current.includes('your') &&
                      !config.current.includes('tu_');

  const status = isConfigured ? '✅' : '❌';
  console.log(`${status} ${key}:`);
  console.log(`   Actual: "${config.current || 'NO CONFIGURADO'}"`);
  console.log(`   Descripción: ${config.description}`);

  if (!isConfigured) {
    allConfigured = false;
    console.log(`   ❌ PROBLEMA: No está configurado correctamente`);
  } else {
    console.log(`   ✅ OK: Configurado correctamente`);
  }
  console.log('');
});

if (allConfigured) {
  console.log('🎉 ¡CONFIGURACIÓN COMPLETA!');
  console.log('============================\n');
  console.log('✅ Todas las variables de EmailJS están configuradas correctamente.');
  console.log('✅ El formulario de contacto debería funcionar.');
  console.log('\n📧 PRUEBA EL FORMULARIO:');
  console.log('• Ejecuta: npm run dev');
  console.log('• Ve a la sección "Contáctanos"');
  console.log('• Envía un mensaje de prueba');
  console.log('• Revisa tu bandeja de taloslogos@gmail.com\n');

} else {
  console.log('⚠️  CONFIGURACIÓN INCOMPLETA');
  console.log('=============================\n');

  console.log('Para completar la configuración, sigue estos pasos:\n');

  console.log('1️⃣ CREA CUENTA EN EMAILJS:');
  console.log('   https://www.emailjs.com/');
  console.log('   Regístrate con taloslogos@gmail.com\n');

  console.log('2️⃣ CONFIGURA GMAIL:');
  console.log('   • Ve a "Email Services"');
  console.log('   • Agrega "Gmail" como servicio');
  console.log('   • Autoriza el acceso');
  console.log('   • Copia el Service ID\n');

  console.log('3️⃣ CREA TEMPLATE:');
  console.log('   • Ve a "Email Templates"');
  console.log('   • Nuevo template con ID: template_contact_form');
  console.log('   • Copia el contenido del archivo: src/templates/emailjs-contact-form.html\n');

  console.log('4️⃣ OBTÉN USER ID:');
  console.log('   • Ve a "Account" → "General"');
  console.log('   • Copia tu "User ID"\n');

  console.log('5️⃣ ACTUALIZA TU .ENV:');
  console.log('   Reemplaza los valores actuales con los reales:\n');

  console.log('   ```env');
  console.log('   REACT_APP_EMAILJS_SERVICE_ID=service_tu_id_real_aqui');
  console.log('   REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form');
  console.log('   REACT_APP_EMAILJS_USER_ID=tu_user_id_real_aqui');
  console.log('   ```\n');

  console.log('6️⃣ VERIFICA:');
  console.log('   npm run diagnose-emailjs\n');
}

console.log('🔧 COMANDOS ÚTILES:');
console.log('• npm run setup-contact-emailjs - Ver instrucciones completas');
console.log('• npm run diagnose-emailjs - Ejecutar este diagnóstico');
console.log('• npm run dev - Probar el formulario\n');

console.log('💡 NOTA: EmailJS es gratuito para hasta 200 emails/mes.');
console.log('   Para más emails, considera actualizar a plan pago.\n');

console.log('📞 ¿Necesitas ayuda específica con algún paso?');