import { toast } from "react-toastify";
import { toggleFavoriteMediaApi } from "../../services/mediaService";

export async function favoriteToggleHandler(
  mediaId,
  token,
  logout,
  setMedias,
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
