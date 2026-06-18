/**
 * Configuration centralisée pour l'API Dify
 * Les variables d'environnement sont chargées au runtime
 */

const DIFY_TOKEN = import.meta.env.VITE_DIFY_TOKEN;
const DIFY_API_URL = import.meta.env.VITE_DIFY_API_URL || 'https://api.dify.ai/v1';

if (!DIFY_TOKEN) {
  console.warn('⚠️ VITE_DIFY_TOKEN is not configured. Please set it in .env.local');
}

export const difyConfig = {
  token: DIFY_TOKEN,
  apiUrl: DIFY_API_URL,
  chatMessagesEndpoint: `${DIFY_API_URL}/chat-messages`,
};

/**
 * Effectue un appel API Dify pour traiter une requête
 */
export async function callDifyAPI(
  query: string,
  inputs?: Record<string, string>,
  options?: { signal?: AbortSignal; userId?: string }
) {
  if (!difyConfig.token) {
    throw new Error('Dify API token is not configured');
  }

  const response = await fetch(difyConfig.chatMessagesEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${difyConfig.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: inputs || {},
      query,
      response_mode: 'blocking',
      user: options?.userId || `user-${Date.now()}`,
    }),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Dify API error: ${response.statusText}`);
  }

  const json = await response.json();
  const text =
    json?.answer ??
    json?.data?.outputs?.text ??
    json?.data?.outputs?.answer ??
    (typeof json?.data?.outputs === 'string' ? json.data.outputs : null);

  return text || null;
}
