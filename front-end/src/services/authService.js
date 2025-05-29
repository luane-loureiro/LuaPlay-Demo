// src/services/authService.js
import { API_URL } from './config';

/**
 * Faz login e retorna { token, user }.
 */
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Erro desconhecido');
  }

  const data = await response.json();
  return {
    token: data.token,
    user: {
      username: data.user.username,
      email: data.user.email,
    },
  };
}

/**
 * Cadastra um novo usuário.
 */
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Erro desconhecido');
  }

  return response.json();
}
