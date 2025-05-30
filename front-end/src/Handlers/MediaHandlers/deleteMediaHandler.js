import { deleteMedia } from "../../services/mediaService";


// Prepara o modal de confirmação para deletar uma mídia.
export function deleteMediaHandler(
  media,
  setMediaToDelete,
  setShowModalMedia
) {
  setMediaToDelete(media);
  setShowModalMedia(true);
}


// Confirma a exclusão da mídia.
export async function confirmDeleteMediaHandler(
  mediaToDelete,
  token,
  logout,
  setMedias,
  setShowModalMedia,
  setMediaToDelete,
  reloadMedias
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
