import { API_URL } from './config';  // <-- IMPORTAÇÃO ESSENCIAL

export async function fetchWithAuth(endpoint, options = {}, token, logout) {
  const fullUrl = `${API_URL}${endpoint}`;
  console.log("🚀 AQUI!!!!! [fetchWithAuth] Full URL:", fullUrl); // <-- AQUI

  const headers = {
    ...(options.headers || {}),
  };

  // Sempre setar Content-Type se houver body, independente do tipo
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      console.warn('Token inválido ou expirado. Realizando logout...');
      if (typeof logout === 'function') logout();
      throw new Error('Não autorizado (401)');
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(errData.message || 'Erro desconhecido');
    }

    return response.json();
  } catch (err) {
    console.error('Erro em fetchWithAuth:', err.message);
    throw err;
  }
}
