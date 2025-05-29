import { useEffect, useState } from "react";
import { fetchPlaylists } from "../services/playlistsService";
import { fetchMediasByPlaylist } from "../services/mediaService";

export function useLoadPlaylistsAndMedias(token, logout, navigate) {
  const [playlists, setPlaylists] = useState([]);
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const pls = await fetchPlaylists(token, logout);
        const formatted = pls.map(pl => ({
          id: pl._id,
          name: pl.name,
          color: pl.color,
          description: pl.description || ""
        }));
        setPlaylists(formatted);

        const all = [];
        for (const pl of formatted) {
          const md = await fetchMediasByPlaylist(pl.name, token, logout);

          if (Array.isArray(md)) {
            md.forEach(m =>
              all.push({
                id: m._id || m.id,
                title: m.title,
                url: m.url,
                description: m.description,
                favorite: m.favorite || false,
                playlistId: pl.id,
                playlistName: pl.name
              })
            );
          }
        }
        setMedias(all);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    })();
  }, [token, logout, navigate]);

  // Função para recarregar só as mídias, útil após adicionar nova mídia
  async function reloadMedias() {
    if (!token) return;

    try {
      const all = [];
      for (const pl of playlists) {
        const md = await fetchMediasByPlaylist(pl.name, token, logout);

        if (Array.isArray(md)) {
          md.forEach(m =>
            all.push({
              id: m._id || m.id,
              title: m.title,
              url: m.url,
              description: m.description,
              favorite: m.favorite || false,
              playlistId: pl.id,
              playlistName: pl.name
            })
          );
        }
      }
      setMedias(all);
    } catch (err) {
      console.error("Erro ao recarregar mídias:", err);
    }
  }

  return { playlists, medias, setPlaylists, setMedias, reloadMedias };
}
