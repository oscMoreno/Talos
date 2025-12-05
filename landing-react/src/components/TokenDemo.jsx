import { generateSecureApiToken, isValidUUID, getTokenInfo } from '../utils/tokenGenerator';

/**
 * Componente de demostración para mostrar el uso de tokens UUID
 * Este componente es solo para desarrollo/testing
 */
const TokenDemo = () => {
  const currentToken = process.env.REACT_APP_API_TOKEN || 'No token configured';
  const tokenInfo = getTokenInfo(currentToken);

  const handleGenerateNewToken = () => {
    const newToken = generateSecureApiToken();
    console.log('Nuevo token generado:', newToken);
    alert(`Nuevo token generado: ${newToken}\n\nEjecuta: npm run generate-token\npara actualizar el .env`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-[#CBD5E1] rounded-lg">
      <h2 className="text-2xl font-light text-[#0D0D12] mb-6">
        🔐 Sistema de Tokens API - Demostración
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Información del Token Actual */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#0D0D12]">Token Actual</h3>

          <div className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded">
            <div className="text-sm text-[#6b7280] mb-2">REACT_APP_API_TOKEN</div>
            <div className="font-mono text-sm break-all text-[#0D0D12]">
              {currentToken}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#6b7280]">Válido:</span>
              <span className={`ml-2 font-medium ${tokenInfo.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {tokenInfo.isValid ? '✅ Sí' : '❌ No'}
              </span>
            </div>
            <div>
              <span className="text-[#6b7280]">Versión:</span>
              <span className="ml-2 font-medium text-[#0D0D12]">{tokenInfo.version || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#6b7280]">Longitud:</span>
              <span className="ml-2 font-medium text-[#0D0D12]">{tokenInfo.length} chars</span>
            </div>
            <div>
              <span className="text-[#6b7280]">Estándar:</span>
              <span className="ml-2 font-medium text-[#9747FF]">{tokenInfo.standard}</span>
            </div>
          </div>
        </div>

        {/* Generador de Tokens */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#0D0D12]">Generador de Tokens</h3>

          <div className="space-y-3">
            <button
              onClick={handleGenerateNewToken}
              className="w-full bg-[#9747FF] text-[#F8FAFC] px-4 py-3 rounded-none font-medium hover:bg-[#8B3DFF] transition-colors duration-300"
            >
              🔄 Generar Nuevo Token
            </button>

            <button
              onClick={() => {
                const tokens = [];
                for (let i = 0; i < 5; i++) {
                  tokens.push(generateSecureApiToken());
                }
                console.log('Múltiples tokens generados:', tokens);
                alert(`${tokens.length} tokens generados. Revisa la consola.`);
              }}
              className="w-full bg-[#38BDF8] text-[#F8FAFC] px-4 py-3 rounded-none font-medium hover:bg-[#0EA5E9] transition-colors duration-300"
            >
              🎲 Generar 5 Tokens
            </button>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-medium text-yellow-900 mb-2">💡 Consejos de Seguridad:</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Nunca compartas tokens en repositorios públicos</li>
              <li>• Rota tokens periódicamente</li>
              <li>• Usa diferentes tokens para diferentes entornos</li>
              <li>• Monitorea el uso de tokens en producción</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Información Técnica */}
      <div className="mt-8 p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded">
        <h3 className="text-lg font-medium text-[#0D0D12] mb-4">
          📚 Información Técnica - UUID v4 (RFC4122)
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-[#0D0D12] mb-2">¿Qué es UUID?</h4>
            <p className="text-[#374151]">
              UUID (Universally Unique Identifier) es un estándar para generar identificadores únicos.
              La versión 4 genera IDs aleatorios de 128 bits.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#0D0D12] mb-2">Formato RFC4122</h4>
            <div className="font-mono bg-white p-2 border border-[#CBD5E1] rounded text-xs">
              xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            </div>
            <p className="text-[#374151] mt-2">
              8-4-4-4-12 caracteres hexadecimales
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#0D0D12] mb-2">Comandos Útiles</h4>
            <div className="space-y-1 font-mono text-xs">
              <div><code className="bg-white px-1 py-0.5 border border-[#CBD5E1] rounded">npm run generate-token</code></div>
              <div><code className="bg-white px-1 py-0.5 border border-[#CBD5E1] rounded">node scripts/generate-api-token.js</code></div>
            </div>
          </div>
        </div>
      </div>

      {/* Uso en la Aplicación */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
        <h4 className="font-medium text-green-900 mb-2">🚀 Cómo usar el token en tu código:</h4>
        <div className="bg-white p-3 border border-green-200 rounded font-mono text-sm">
          <div className="text-gray-600 mb-2">// En tus servicios API:</div>
          <div>const token = process.env.REACT_APP_API_TOKEN;</div>
          <div className="mt-2 text-gray-600">// Headers de autenticación:</div>
          <div>headers: &#123; 'Authorization': `Bearer $&#123;token&#125;` &#125;</div>
        </div>
      </div>
    </div>
  );
};

export default TokenDemo;