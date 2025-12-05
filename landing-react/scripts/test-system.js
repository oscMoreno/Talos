#!/usr/bin/env node

/**
 * Script de pruebas del sistema Talos
 * Verifica que todos los componentes funcionen correctamente
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { generateSecureApiToken, isValidUUID, getTokenInfo } from '../src/utils/tokenGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 PRUEBAS DEL SISTEMA TALOS');
console.log('=============================\n');

// Array para almacenar resultados de pruebas
const testResults = [];
let passedTests = 0;
let totalTests = 0;

function test(name, testFn) {
  totalTests++;
  try {
    const result = testFn();
    if (result !== false) {
      console.log(`✅ ${name}`);
      testResults.push({ name, status: 'PASS' });
      passedTests++;
      return true;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    testResults.push({ name, status: 'FAIL', error: error.message });
    return false;
  }
  console.log(`❌ ${name}`);
  testResults.push({ name, status: 'FAIL' });
  return false;
}

// 1. Verificar estructura de archivos
console.log('📁 VERIFICANDO ESTRUCTURA DE ARCHIVOS:');
console.log('=====================================\n');

test('Archivo package.json existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'package.json'));
});

test('Archivo .env existe', () => {
  return fs.existsSync(path.join(__dirname, '..', '.env'));
});

test('Directorio src existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src'));
});

test('Directorio components existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'components'));
});

test('Archivo App.jsx existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'App.jsx'));
});

test('Archivo main.jsx existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'main.jsx'));
});

// 2. Verificar dependencias
console.log('\n📦 VERIFICANDO DEPENDENCIAS:');
console.log('===========================\n');

test('uuid está instalado', () => {
  try {
    uuidv4(); // Si no está instalado, esto fallará
    return true;
  } catch {
    return false;
  }
});

test('react está en package.json', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.dependencies && packageJson.dependencies.react;
});

test('tailwindcss está en package.json', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.dependencies && packageJson.dependencies.tailwindcss;
});

// 3. Verificar variables de entorno
console.log('\n🔧 VERIFICANDO VARIABLES DE ENTORNO:');
console.log('===================================\n');

test('REACT_APP_API_TOKEN existe', () => {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  return envContent.includes('REACT_APP_API_TOKEN=') &&
         !envContent.includes('REACT_APP_API_TOKEN=your');
});

test('Token API es UUID válido', () => {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  const tokenMatch = envContent.match(/REACT_APP_API_TOKEN=(.+)/);
  if (tokenMatch) {
    return isValidUUID(tokenMatch[1]);
  }
  return false;
});

test('Variables de email están limpias', () => {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  // Verificar que no hay variables de EmailJS
  const hasEmailJS = envContent.includes('REACT_APP_EMAILJS_');
  return !hasEmailJS;
});

// 4. Verificar utilidades de tokens
console.log('\n🔐 VERIFICANDO UTILIDADES DE TOKENS:');
console.log('===================================\n');

test('generateSecureApiToken funciona', () => {
  const token = generateSecureApiToken();
  return isValidUUID(token);
});

test('isValidUUID funciona correctamente', () => {
  return isValidUUID('da24255b-3226-46c3-9168-7e2d78a3201e') &&
         !isValidUUID('invalid-uuid');
});

test('getTokenInfo funciona', () => {
  const token = generateSecureApiToken();
  const info = getTokenInfo(token);
  return info.isValid && info.standard === 'RFC4122';
});

// 5. Verificar templates de email
console.log('\n📧 VERIFICANDO TEMPLATES DE EMAIL:');
console.log('=================================\n');

test('Template de solicitud de reseña existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'templates', 'reviewRequestEmail.html'));
});

test('Template de agradecimiento existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'templates', 'thankYouEmail.html'));
});

test('Templates contienen contenido HTML válido', () => {
  const reviewTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'templates', 'reviewRequestEmail.html'),
    'utf8'
  );
  const thankYouTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'templates', 'thankYouEmail.html'),
    'utf8'
  );

  return reviewTemplate.includes('<!DOCTYPE html>') &&
         reviewTemplate.includes('{{clientName}}') &&
         thankYouTemplate.includes('<!DOCTYPE html>') &&
         thankYouTemplate.includes('{{clientName}}');
});

// 6. Verificar componentes
console.log('\n🧩 VERIFICANDO COMPONENTES:');
console.log('==========================\n');

const components = [
  'Header.jsx', 'Portfolio.jsx', 'Testimonials.jsx',
  'Services.jsx', 'Contact.jsx', 'Footer.jsx',
  'ReviewForm.jsx'
];

components.forEach(component => {
  test(`Componente ${component} existe`, () => {
    return fs.existsSync(path.join(__dirname, '..', 'src', 'components', component));
  });
});

// 7. Verificar servicios
console.log('\n🔧 VERIFICANDO SERVICIOS:');
console.log('=========================\n');

test('Servicio de email existe', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'services', 'emailService.js'));
});

test('Utilidades de email marketing existen', () => {
  return fs.existsSync(path.join(__dirname, '..', 'src', 'utils', 'emailMarketing.js'));
});

// 8. Verificar configuración de build
console.log('\n🏗️  VERIFICANDO CONFIGURACIÓN DE BUILD:');
console.log('=====================================\n');

test('Scripts de npm están configurados', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const scripts = packageJson.scripts;
  return scripts.dev && scripts.build && scripts['generate-token'];
});

test('Vite está configurado', () => {
  return fs.existsSync(path.join(__dirname, '..', 'vite.config.js'));
});

test('ESLint está configurado', () => {
  return fs.existsSync(path.join(__dirname, '..', 'eslint.config.js'));
});

// Resultados finales
console.log('\n📊 RESULTADOS DE LAS PRUEBAS:');
console.log('=============================\n');

console.log(`✅ Pruebas pasadas: ${passedTests}/${totalTests}`);
console.log(`❌ Pruebas fallidas: ${totalTests - passedTests}/${totalTests}`);
console.log(`📈 Tasa de éxito: ${Math.round((passedTests / totalTests) * 100)}%\n`);

if (passedTests === totalTests) {
  console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
  console.log('🚀 El sistema Talos está listo para funcionar.\n');

  console.log('💡 PRÓXIMOS PASOS RECOMENDADOS:');
  console.log('1. Configura tu User ID de EmailJS');
  console.log('2. Ejecuta: npm run dev');
  console.log('3. Verifica que la aplicación carga correctamente');
  console.log('4. Prueba la navegación entre secciones');
  console.log('5. Verifica que los estilos se aplican correctamente\n');
} else {
  console.log('⚠️  Algunas pruebas fallaron. Revisa los errores arriba.\n');

  console.log('🔧 PRUEBAS FALLIDAS:');
  testResults.filter(test => test.status === 'FAIL').forEach(test => {
    console.log(`❌ ${test.name}${test.error ? ': ' + test.error : ''}`);
  });
  console.log('');
}

console.log('📚 COMANDOS ÚTILES:');
console.log('• npm run dev - Iniciar servidor de desarrollo');
console.log('• npm run generate-token - Generar nuevo token API');
console.log('• npm run setup-emailjs - Configurar EmailJS');
console.log('• npm run build - Construir para producción\n');

console.log('✨ ¡Sistema de pruebas completado!');