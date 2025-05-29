// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoadPlaylistsAndMedias } from "../hooks/useLoadPlaylistsAndMedias";
import { useApi } from "../hooks/useApi";
import Playlist from "../components/PlayList";
import DeleteMediaModal from "../components/Modals/DeleteMediaModal";
import DeletePlaylistModal from "../components/Modals/DeletePlaylistModal";
import AddMediaModal from "../components/Modals/AddMediaModal";
import { handleDeleteMedia, handleToggleFavorite, confirmDeleteMedia } from "../Handlers/mediaHandlers";
import {
  handleDeletePlaylist,
  handleConfirmDeletePlaylist,
  handleConfirmAddMediaToPlaylist
} from "../Handlers/playlistHandlers";

export default function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const { playlists, setPlaylists, medias, setMedias } = useLoadPlaylistsAndMedias(token, logout, navigate);

  const {
    addMediaToPlaylist,
    deleteMedia,
    toggleFavoriteMedia
  } = useApi();

  const [showModalPlaylist, setShowModalPlaylist] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);

  const [showModalMedia, setShowModalMedia] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [playlistToAddMedia, setPlaylistToAddMedia] = useState(null);

  const [newMediaTitle, setNewMediaTitle] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaDescription, setNewMediaDescription] = useState("");
  const [newMediaCoverUrl, setNewMediaCoverUrl] = useState("");
  const [newMediaDuration, setNewMediaDuration] = useState("");

  if (!token) {
    navigate("/login");
    return null;
  }

  if (!playlists || playlists.length === 0) return <p>Carregando playlists...</p>;

  // DEBUG
  console.log("playlists:", playlists);
  console.log("medias:", medias);
  console.log("medias com playlistName:", medias.map(m => ({ id: m.id, playlistName: m.playlistName })));

  return (
    <section>
      {playlists.map(pl => (
  <Playlist
    key={pl.id}
    playlist={pl}
    color={pl.color}
    mediaItems={medias.filter(m => m.playlistId === pl.id)}
    onAddMedia={() => {
      setPlaylistToAddMedia(pl);
      setShowAddMediaModal(true);
      setNewMediaTitle("");
      setNewMediaUrl("");
      setNewMediaDescription("");
      setNewMediaCoverUrl("");
      setNewMediaDuration("");
    }}
    onDeleteMedia={media => handleDeleteMedia(media, setMediaToDelete, setShowModalMedia)}
    // Passando o objeto completo para pegar o favorite dentro do handler
    onFavorite={media => handleToggleFavorite(media.id, token, logout, setMedias, toggleFavoriteMedia, media.favorite)}
    onDeletePlaylist={() => handleDeletePlaylist(pl, setPlaylistToDelete, setShowModalPlaylist)}
  />
))}

      <DeletePlaylistModal
        isOpen={showModalPlaylist}
        onClose={() => setShowModalPlaylist(false)}
        playlist={playlistToDelete}
        onConfirm={() =>
          handleConfirmDeletePlaylist(
            playlistToDelete,
            token,
            logout,
            setPlaylists,
            setMedias,
            setShowModalPlaylist,
            setPlaylistToDelete
          )
        }
      />

      <DeleteMediaModal
        isOpen={showModalMedia}
        onClose={() => setShowModalMedia(false)}
        media={mediaToDelete}
        onConfirm={() =>
          confirmDeleteMedia(
            mediaToDelete,
            token,
            logout,
            setMedias,
            setShowModalMedia,
            setMediaToDelete
          )
        }
      />

      <AddMediaModal
        isOpen={showAddMediaModal}
        onClose={() => setShowAddMediaModal(false)}
        playlistName={playlistToAddMedia?.name || ""}
        title={newMediaTitle}
        url={newMediaUrl}
        description={newMediaDescription}
        coverUrl={newMediaCoverUrl}
        duration={newMediaDuration}
        setTitle={setNewMediaTitle}
        setUrl={setNewMediaUrl}
        setDescription={setNewMediaDescription}
        setCoverUrl={setNewMediaCoverUrl}
        setDuration={setNewMediaDuration}
        onConfirm={() => {
          if (!newMediaTitle.trim() || !newMediaUrl.trim()) {
            alert("Título e URL são obrigatórios");
            return;
          }

          handleConfirmAddMediaToPlaylist(
            playlistToAddMedia,
            {
              title: newMediaTitle,
              url: newMediaUrl,
              description: newMediaDescription,
              coverUrl: newMediaCoverUrl,
              duration: Number(newMediaDuration) || 0
            },
            token,
            logout,
            setMedias,
            setShowAddMediaModal,
            setPlaylistToAddMedia,
            addMediaToPlaylist
          );
        }}
      />
    </section>
  );
}