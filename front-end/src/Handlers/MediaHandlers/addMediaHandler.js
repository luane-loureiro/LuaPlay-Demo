// src/handlers/playlist/addMediaHandler.js

//Confirma a adição de uma nova mídia à playlist.
export async function confirmAddMediaToPlaylistHandler(
  playlist,
  mediaData,
  token,
  logout,
  {
    setMedias,
    setShowAddMediaModal,
    setPlaylistToAddMedia,
    reloadMedias
  },
  addMediaToPlaylist
) {
  if (!playlist) {
    console.error("Playlist está indefinida!");
    return;
  }

  const { title, url } = mediaData;
  const playlistIdOrName = playlist?.name;

  if (!title?.trim() || !url?.trim() || !playlistIdOrName) {
    alert("Preencha título, URL e selecione uma playlist válida.");
    return;
  }

  const body = {
    ...mediaData,
    playlistIdOrName
  };

  try {
    await addMediaToPlaylist(body, token, logout);
    await reloadMedias();
  } catch (e) {
    console.error("Erro ao adicionar mídia:", e);
    alert("Erro ao adicionar mídia");
  } finally {
    setShowAddMediaModal(false);
    setPlaylistToAddMedia(null);
  }
}

// src/Handlers/PlaylistHandlers/AddMediaHandler.js
export function openAddMediaModalHandler(
  playlistId,
  playlists,
  {
    setPlaylistToAddMedia,
    setShowAddMediaModal,
    setNewMediaTitle,
    setNewMediaUrl,
    setNewMediaDescription,
    setNewMediaCoverUrl,
    setNewMediaDuration
  }
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

