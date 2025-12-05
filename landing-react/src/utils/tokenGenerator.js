/**
 * Utilidad para generar tokens seguros usando UUID v4 (RFC4122)
 * Esta utilidad genera tokens únicos y seguros para autenticación API
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Genera un token API seguro usando UUID v4
 * @returns {string} Token único RFC4122 compliant
 */
export const generateSecureApiToken = () => {
  // UUID v4 genera un identificador único de 128 bits
  // Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // Donde x es cualquier dígito hexadecimal y y es 8, 9, A, o B
  return uuidv4();
};

/**
 * Genera múltiples tokens para diferentes propósitos
 * @param {number} count - Número de tokens a generar
 * @returns {string[]} Array de tokens únicos
 */
export const generateMultipleTokens = (count = 1) => {
  const tokens = [];
  for (let i = 0; i < count; i++) {
    tokens.push(uuidv4());
  }
  return tokens;
};

/**
 * Valida si un string es un UUID válido
 * @param {string} token - Token a validar
 * @returns {boolean} True si es un UUID válido
 */
export const isValidUUID = (token) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(token);
};

/**
 * Genera un token con prefijo personalizado
 * @param {string} prefix - Prefijo para el token
 * @returns {string} Token con prefijo
 */
export const generatePrefixedToken = (prefix = 'talos') => {
  return `${prefix}_${uuidv4()}`;
};

/**
 * Información sobre la seguridad del token generado
 * @param {string} token - Token generado
 * @returns {object} Información sobre el token
 */
export const getTokenInfo = (token) => {
  return {
    token,
    isValid: isValidUUID(token),
    length: token.length,
    version: token ? token.split('-')[2]?.charAt(0) : null,
    variant: token ? token.split('-')[3]?.charAt(0) : null,
    generatedAt: new Date().toISOString(),
    expiresAt: null, // Los UUID no expiran por defecto
    standard: 'RFC4122',
    algorithm: 'UUID v4 (Random)'
  };
};

/**
 * Genera un token para desarrollo/testing
 * @returns {string} Token de desarrollo (no usar en producción)
 */
export const generateDevToken = () => {
  // Token fijo para desarrollo - NUNCA usar en producción
  return 'dev-token-12345-abcdef-uuid-v4-format';
};

/**
 * Función principal para uso en línea de comandos
 * Ejecutar con: node -e "import('./src/utils/tokenGenerator.js').then(m => console.log(m.generateSecureApiToken()))"
 */
if (typeof window === 'undefined') {
  // Solo ejecutar en Node.js (no en browser)
  const token = generateSecureApiToken();
  console.log('🔐 Nuevo Token API Seguro Generado:');
  console.log('=====================================');
  console.log(`Token: ${token}`);
  console.log(`Válido: ${isValidUUID(token)}`);
  console.log(`Longitud: ${token.length} caracteres`);
  console.log(`Estándar: RFC4122 (UUID v4)`);
  console.log('=====================================');
  console.log('');
  console.log('📋 Para usar en tu archivo .env:');
  console.log(`REACT_APP_API_TOKEN=${token}`);
  console.log('');
  console.log('⚠️  IMPORTANTE: Guarda este token en un lugar seguro');
  console.log('⚠️  No lo compartas en repositorios públicos');
}

// Exportar funciones para uso en la aplicación
export default {
  generateSecureApiToken,
  generateMultipleTokens,
  isValidUUID,
  generatePrefixedToken,
  getTokenInfo,
  generateDevToken
};