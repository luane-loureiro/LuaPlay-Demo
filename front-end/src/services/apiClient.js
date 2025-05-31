// src/services/apiClient.js
export async function fetchWithAuth(endpoint, options = {}, token, logout) {
  const baseUrl = import.meta.env.VITE_API_BASE;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // Se o token expirou ou inválido
  if (response.status === 401) {
    logout?.();
    throw new Error('Não autorizado. Token inválido ou expirado.');
  }

  // Se houver erro, lança exceção
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  // Retorna JSON ou vazio
  return response.status === 204 ? null : response.json();
}
