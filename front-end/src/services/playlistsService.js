// src/services/playlistService.js
import { fetchWithAuth } from './apiClient';

/** Lista todas as playlists do usuário. */
export async function fetchPlaylists(token, logout) {
  return fetchWithAuth('/api/playlists', {}, token, logout);
}

/** Lista todas as mídias de uma playlist pelo nome. */
export async function fetchMediasByPlaylist(name, token, logout) {
  const encoded = encodeURIComponent(name);
  return fetchWithAuth(`/api/playlists/${encoded}/medias`, {}, token, logout);
}

/** Cria uma nova playlist. */
export async function createPlaylist(data, token, logout) {
  return fetchWithAuth(
    '/api/playlists',
    { method: 'POST', body: JSON.stringify(data) },
    token,
    logout
  );
}

/** Deleta uma playlist pelo nome. */
export async function deletePlaylist(name, token, logout) {
  return fetchWithAuth(
    `/api/playlists/${encodeURIComponent(name)}`,
    { method: 'DELETE' },
    token,
    logout
  )
    .then(() => true)
    .catch((err) => {
      console.error('Erro ao deletar playlist:', err);
      return false;
    });
}

/** Atualiza campos de uma playlist existente. */
export async function updatePlaylist(name, updates, token, logout) {
  return fetchWithAuth(
    `/api/playlists/${encodeURIComponent(name)}`,
    { method: 'PATCH', body: JSON.stringify(updates) },
    token,
    logout
  );
}
