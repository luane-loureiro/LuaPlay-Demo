// front-end/src/handlers/mediaHandlers.jsx
import {
  deleteMedia,
  toggleFavoriteMedia,
} from "../services/mediaService";

/**
 * Marca ou desmarca uma mídia como favorita.
 * @param {string} mediaId - ID da mídia a ser atualizada.
 * @param {string} token - Token de autenticação.
 * @param {function} logout - Função para deslogar em caso de erro de autenticação.
 * @param {function} setMedias - Setter do estado das mídias.
 * @param {function} apiToggleFavorite - Função da API para fazer a requisição de toggle.
 * @param {boolean} currentFavorite - Valor atual do favorito da mídia (true/false).
 */
export async function handleToggleFavorite(mediaId, token, logout, setMedias, apiToggleFavorite, currentFavorite) {
  try {
    // Inverte o valor atual do favorito
    const newFavoriteValue = !currentFavorite;

    // Chama a API para alterar o favorito
    const success = await apiToggleFavorite(mediaId, newFavoriteValue, token, logout);
    
    if (success) {
      // Atualiza o estado local para refletir a mudança
      setMedias(prev =>
        prev.map(m =>
          m.id === mediaId ? { ...m, favorite: newFavoriteValue } : m
        )
      );
    } else {
      alert("Erro ao atualizar favorito");
    }
  } catch (e) {
    console.error("Erro ao atualizar favorito:", e);
    alert("Erro ao atualizar favorito");
  }
}

/**
 * Prepara o modal de confirmação para deletar uma mídia.
 */
export function handleDeleteMedia(
  media,
  setMediaToDelete,
  setShowModalMedia
) {
  setMediaToDelete(media);
  setShowModalMedia(true);
}

/**
 * Confirma a exclusão da mídia.
 */
export async function confirmDeleteMedia(
  mediaToDelete,
  token,
  logout,
  setMedias,
  setShowModalMedia,
  setMediaToDelete
) {
  if (!mediaToDelete) return;

  try {
    const success = await deleteMedia(mediaToDelete.title, token, logout);
    if (success) {
      setMedias(prev =>
        prev.filter(m => m.title !== mediaToDelete.title)
      );
    } else {
      alert("Erro ao excluir mídia");
    }
  } catch (e) {
    console.error("Erro ao excluir mídia:", e);
    alert("Erro ao excluir mídia");
  } finally {
    setShowModalMedia(false);
    setMediaToDelete(null);
  }
}
