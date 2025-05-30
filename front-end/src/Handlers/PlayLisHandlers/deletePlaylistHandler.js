// src/handlers/playlistHandlers/modalsDeletePlayListHandler.js

import { deletePlaylist } from "../../services/playlistsService";

// Prepara modal de confirmação para deletar playlist.
export function deletePlaylistHandler(
  playlist,
  { setPlaylistToDelete, setShowModalPlaylist }
) {
  setPlaylistToDelete(playlist);
  setShowModalPlaylist(true);
}

// Confirma a exclusão da playlist e remove suas mídias.
export async function confirmDeletePlaylistHandler(
  playlist,
  token,
  logout,
  {
    setPlaylists,
    setMedias,
    setShowModalPlaylist,
    setPlaylistToDelete
  }
) {
  if (!playlist) return;

  try {
    const success = await deletePlaylist(playlist.name, token, logout);
    if (success) {
      setPlaylists(prev => prev.filter(p => p.id !== playlist.id));
      setMedias(prev => prev.filter(m => m.playlistName !== playlist.name));
    } else {
      alert("Erro ao excluir playlist");
    }
  } catch (e) {
    console.error("Erro ao deletar playlist:", e);
    alert("Erro ao excluir playlist");
  } finally {
    setShowModalPlaylist(false);
    setPlaylistToDelete(null);
  }
}
