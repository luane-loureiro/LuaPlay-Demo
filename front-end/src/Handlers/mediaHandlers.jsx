import { toast } from "react-toastify";
import { toggleFavoriteMediaApi, deleteMedia } from "../services/mediaService";

export async function handleToggleFavorite(
  mediaId,
  token,
  logout,
  setMedias,
  toggleFavoriteMediaApi,
  currentFavorite,
  reloadMedias,
  setLoading = () => {}
) {
  try {
    await toggleFavoriteMediaApi(mediaId, !currentFavorite, token, logout);

    toast.success("Favorito atualizado!");

    if (reloadMedias) {
      await reloadMedias();
    } else {
      setMedias((prev) =>
        prev.map((m) =>
          m.id === mediaId ? { ...m, favorite: !currentFavorite } : m
        )
      );
    }
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
    toast.error("Erro ao atualizar favorito");
  } finally {
    setLoading(false);
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
  setMediaToDelete,
  reloadMedias // <- adicionar este parâmetro
) {
  if (!mediaToDelete) return;

  try {
    const success = await deleteMedia(mediaToDelete.title, token, logout);
    if (success) {
      if (reloadMedias) {
        await reloadMedias();
      } else {
        setMedias(prev => prev.filter(m => m.title !== mediaToDelete.title));
      }
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
