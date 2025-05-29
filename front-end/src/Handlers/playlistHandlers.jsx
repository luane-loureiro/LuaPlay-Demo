//front-end/src/handlers/playlistHandlers.jsx
import { deletePlaylist } from "../services/playlistsService";
import { addMediaToPlaylist } from "../services/mediaService";

/**
 * Abre o modal para adicionar uma nova mídia à playlist.
 */
export function handleAddMediaToPlaylistById(
  playlistId,
  playlists,
  setPlaylistToAddMedia,
  setShowAddMediaModal,
  setNewMediaTitle,
  setNewMediaUrl,
  setNewMediaDescription,
  setNewMediaCoverUrl,
  setNewMediaDuration
) {
  const playlist = playlists.find(p => p.id === playlistId);
  
  if (!playlist) {
    console.warn(`Playlist com id ${playlistId} não encontrada.`);
    return;
  }

  setPlaylistToAddMedia(playlist);
  setNewMediaTitle("");
  setNewMediaUrl("");
  setNewMediaDescription("");
  setNewMediaCoverUrl("");
  setNewMediaDuration("");
  setShowAddMediaModal(true);
}

/**
 * Prepara modal de confirmação para deletar playlist.
 */
export function handleDeletePlaylist(
  playlist,
  setPlaylistToDelete,
  setShowModalPlaylist
) {
  setPlaylistToDelete(playlist);
  setShowModalPlaylist(true);
}

/**
 * Confirma a exclusão da playlist e remove suas mídias.
 */
export async function handleConfirmDeletePlaylist(
  playlist,
  token,
  logout,
  setPlaylists,
  setMedias,
  setShowModalPlaylist,
  setPlaylistToDelete
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

/**
 * Confirma a adição de uma nova mídia à playlist.
 */
export async function handleConfirmAddMediaToPlaylist(
  playlist,
  mediaData,
  token,
  logout,
  setMedias,
  setShowAddMediaModal,
  setPlaylistToAddMedia,
  addMediaToPlaylist
) {
  console.log("=== DEBUG - handleConfirmAddMediaToPlaylist ===");
  console.log("Playlist recebida:", playlist);
  console.log("mediaData recebido:", mediaData);

  if (!playlist) {
    console.error("Playlist está indefinida!");
    return;
  }

  const { title, url } = mediaData;
  const playlistIdOrName = playlist?.name;

  console.log("Campos obrigatórios:");
  console.log("title:", title);
  console.log("url:", url);
  console.log("playlistIdOrName:", playlistIdOrName);

  if (!title?.trim() || !url?.trim() || !playlistIdOrName) {
    console.error("ERRO: Título, URL e playlistIdOrName são obrigatórios.");
    alert("Preencha título, URL e selecione uma playlist válida.");
    return;
  }

  const body = {
    ...mediaData,
    playlistIdOrName
  };

  console.log("Body final enviado para o back:", body);

  try {
    // Enviar o body completo para o service
    const newMedia = await addMediaToPlaylist(body, token, logout);
    setMedias(prev => [...prev, newMedia]);
  } catch (e) {
    console.error("Erro ao adicionar mídia:", e);
    alert("Erro ao adicionar mídia");
  } finally {
    setShowAddMediaModal(false);
    setPlaylistToAddMedia(null);
  }
}
