// src/services/mediaService.js
import { fetchWithAuth } from './apiClient';

/** Busca as mídias de uma playlist pelo nome */
export async function fetchMediasByPlaylist(playlistName, token, logout) {
  const encoded = encodeURIComponent(playlistName);
  return fetchWithAuth(
    `/api/playlists/${encoded}/medias`,
    { method: 'GET' },
    token,
    logout
  );
}

/** Adiciona uma nova mídia a uma playlist. */
export async function addMediaToPlaylist(mediaData, token, logout) {
  return fetchWithAuth(
    `/api/medias`,
    { method: 'POST', body: JSON.stringify(mediaData) },
    token,
    logout
  );
}

/** Deleta uma mídia pelo título. */
export async function deleteMedia(title, token, logout) {
  return fetchWithAuth(
    `/api/medias/${encodeURIComponent(title)}`,
    { method: 'DELETE' },
    token,
    logout
  )
    .then(() => true)
    .catch((err) => {
      console.error('Erro ao deletar mídia:', err);
      return false;
    });
}

/** Atualiza campos de uma mídia existente. */
export async function updateMedia(title, updates, token, logout) {
  return fetchWithAuth(
    `/api/medias/${encodeURIComponent(title)}`,
    { method: 'PATCH', body: JSON.stringify(updates) },
    token,
    logout
  );
}

/** Toggle favorito/desfavorito. */
export async function toggleFavoriteMedia(mediaId, newFavoriteValue, token, logout) {
  const url = `/api/medias/${encodeURIComponent(mediaId)}/favorite`;
  console.log("Toggle favorite URL:", url, "Body:", { favorite: newFavoriteValue });

  return fetchWithAuth(
    url,
    {
      method: 'PATCH',
      body: JSON.stringify({ favorite: newFavoriteValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    token,
    logout
  );
}

