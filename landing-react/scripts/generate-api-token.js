#!/usr/bin/env node

/**
 * Script para generar un token API seguro usando UUID v4 (RFC4122)
 * Uso: node scripts/generate-api-token.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔐 Generador de Tokens API Seguros - Talos');
console.log('==========================================\n');

// Generar token seguro
const apiToken = uuidv4();

console.log('✅ Token API generado exitosamente');
console.log('=====================================');
console.log(`Token: ${apiToken}`);
console.log(`Longitud: ${apiToken.length} caracteres`);
console.log(`Estándar: RFC4122 (UUID v4)`);
console.log(`Versión: 4 (Random)`);
console.log(`Variante: RFC 4122`);
console.log('=====================================\n');

// Verificar si existe archivo .env
const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  // Leer contenido actual del .env
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Verificar si ya existe REACT_APP_API_TOKEN
  const tokenRegex = /^REACT_APP_API_TOKEN=.*/m;

  if (tokenRegex.test(envContent)) {
    // Reemplazar token existente
    envContent = envContent.replace(tokenRegex, `REACT_APP_API_TOKEN=${apiToken}`);
    console.log('📝 Token actualizado en archivo .env existente');
  } else {
    // Agregar nuevo token
    envContent += `\n# API Token generado automáticamente\nREACT_APP_API_TOKEN=${apiToken}\n`;
    console.log('📝 Nuevo token agregado al archivo .env');
  }

  // Escribir archivo actualizado
  fs.writeFileSync(envPath, envContent);
  console.log('💾 Archivo .env actualizado exitosamente\n');

} else {
  // Crear nuevo archivo .env
  const envContent = `# Variables de entorno para Talos
# Generado automáticamente el ${new Date().toISOString()}

# API Configuration
REACT_APP_API_TOKEN=${apiToken}

# Configuración adicional...
# REACT_APP_API_URL=http://localhost:3001/api
`;

  fs.writeFileSync(envPath, envContent);
  console.log('📄 Nuevo archivo .env creado con el token\n');
}

console.log('🎯 Próximos pasos:');
console.log('1. Reinicia tu servidor de desarrollo (npm run dev)');
console.log('2. El token se cargará automáticamente desde las variables de entorno');
console.log('3. Usa process.env.REACT_APP_API_TOKEN en tu código\n');

console.log('⚠️  RECUERDA:');
console.log('- Este token es único y seguro');
console.log('- No lo compartas en repositorios públicos');
console.log('- Si lo comprometes, genera uno nuevo con este script');
console.log('- Mantén el archivo .env fuera del control de versiones (.gitignore)\n');

console.log('🔄 Para generar un nuevo token:');
console.log('node scripts/generate-api-token.js\n');

console.log('✨ ¡Token API configurado correctamente!');

// Salida para uso programático (opcional)
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({
    token: apiToken,
    generatedAt: new Date().toISOString(),
    standard: 'RFC4122',
    version: 'v4'
  }, null, 2));
}