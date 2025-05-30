// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoadPlaylistsAndMedias } from "../hooks/useLoadPlaylistsAndMedias";
import { useApi } from "../hooks/useApi";
import Playlist from "../components/PlayList";
import DeleteMediaModal from "../components/Modals/DeleteMediaModal";
import DeletePlaylistModal from "../components/Modals/DeletePlaylistModal";
import AddMediaModal from "../components/Modals/AddMediaModal";

import {
  confirmAddMediaToPlaylistHandler,
  confirmDeleteMediaHandler,
  deleteMediaHandler,           
  favoriteToggleHandler,
  openAddMediaModalHandler,
} from "../Handlers/MediaHandlers";

import {
  deletePlaylistHandler,
  confirmDeletePlaylistHandler,
} from "../Handlers/PlayLisHandlers";

export default function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const { playlists, setPlaylists, medias, setMedias, reloadMedias } =
    useLoadPlaylistsAndMedias(token, logout, navigate);
  const { addMediaToPlaylist, deleteMedia, toggleFavoriteMedia } = useApi();

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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Se não houver token, sai (e o redirect no useEffect roda em seguida)
  if (!token) return null;

  // Se playlists ainda não carregaram
  if (!playlists || playlists.length === 0) {
    return (     
      <>
        <p className="padded">
          Ops! Parece que você ainda nao tem uma Playlist
        </p>
        <p className="padded">
          Clique em "Criar Playlist" para criar sua primeira Playlist!
        </p>
      </> 

    );
  }

  return (
    <section>
      {playlists.map((pl) => (
        <Playlist
          key={pl.id}
          playlist={pl}
          color={pl.color}
          mediaItems={medias.filter((m) => m.playlistName === pl.name)}
          onAddMedia={() =>
            openAddMediaModalHandler(pl.id, playlists, {
              setPlaylistToAddMedia,
              setShowAddMediaModal,
              setNewMediaTitle,
              setNewMediaUrl,
              setNewMediaDescription,
              setNewMediaCoverUrl,
              setNewMediaDuration,
            })
          }
          onDeleteMedia={(media) =>
            deleteMediaHandler(media, setMediaToDelete, setShowModalMedia)
          }
          onFavorite={(media) =>
            favoriteToggleHandler(
              media.id,
              token,
              logout,
              setMedias,
              toggleFavoriteMedia,
              media.favorite,
              reloadMedias,
              () => {}
            )
          }
          onDeletePlaylist={() =>
            deletePlaylistHandler(pl, {
              setPlaylistToDelete,
              setShowModalPlaylist,
            })
          }
        />
      ))}

      <DeletePlaylistModal
        isOpen={showModalPlaylist}
        onClose={() => setShowModalPlaylist(false)}
        playlist={playlistToDelete}
        onConfirm={() =>
          confirmDeletePlaylistHandler(
            playlistToDelete,
            token,
            logout,
            {
              setPlaylists,
              setMedias,
              setShowModalPlaylist,
              setPlaylistToDelete,
            }
          )
        }
      />

      <DeleteMediaModal
        isOpen={showModalMedia}
        onClose={() => setShowModalMedia(false)}
        media={mediaToDelete}
        onConfirm={() =>
          confirmDeleteMediaHandler(
            mediaToDelete,
            token,
            logout,
            setMedias,
            setShowModalMedia,
            setMediaToDelete,
            reloadMedias
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

          confirmAddMediaToPlaylistHandler(
            playlistToAddMedia,
            {
              title: newMediaTitle,
              url: newMediaUrl,
              description: newMediaDescription,
              coverUrl: newMediaCoverUrl,
              duration: Number(newMediaDuration) || 0,
            },
            token,
            logout,
            setMedias,
            setShowAddMediaModal,
            setPlaylistToAddMedia,
            addMediaToPlaylist,
            reloadMedias
          );
        }}
      />
    </section>
  );
}
