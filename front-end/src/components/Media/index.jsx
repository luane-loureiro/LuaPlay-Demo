import React, { useEffect, useState } from "react";
import styles from "./Media.module.css";
import Button from "../ButtonGeneric";
import classNames from "classnames";

import {
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaPen,
} from "react-icons/fa";

const defaultLoadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT);
      };
    }
  });
};

const Media = ({
  id,
  url,
  title,
  description,
  favorite,
  color,
  onDelete,
  onFavorite,
  onEdit,
  loadYT = defaultLoadYouTubeAPI,
}) => {
  const [duration, setDuration] = useState(null);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const iconClass = classNames({
    [styles.favorito]: isFavorite,
  });

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => {
      const newVal = !prev;
      if (onFavorite) onFavorite(id, newVal);
      return newVal;
    });
  };


  const getYoutubeId = (u) => {
    try {
      const o = new URL(u);
      if (o.hostname.includes("youtube.com") && o.searchParams.has("v"))
        return o.searchParams.get("v");
      if (o.hostname === "youtu.be") return o.pathname.slice(1);
      return null;
    } catch {
      return null;
    }
  };

  const getEmbedUrl = (u) => {
    const videoId = getYoutubeId(u);
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return u;
  };

  useEffect(() => {
    const videoId = getYoutubeId(url);
    if (!videoId) return;

    let player;

    loadYT().then((YT) => {
      player = new YT.Player(`yt-player-${id}`, {
        videoId,
        events: {
          onReady: (event) => {
            const seconds = event.target.getDuration?.() || 0;
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            setDuration(`${min}:${sec < 10 ? "0" + sec : sec}`);
          },
        },
      });
    });

    return () => {
      if (player && player.destroy) player.destroy();
    };
  }, [url, id, loadYT]);

  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.video}>
        <iframe
          src={getEmbedUrl(url)}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          style={{ border: "none" }}
        />
        <div id={`yt-player-${id}`} style={{ display: "none" }} />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {duration && <p className={styles.duration}>Duração: {duration}</p>}

        <div className={styles.buttons}>
          <Button
            onClick={onDelete}
            className={styles.iconText}
            data-testid={`delete-button-${id}`}
            aria-label="Deletar mídia"
          >
            <FaTrash /> <span>Deletar</span>
          </Button>

          <Button
            onClick={onEdit}
            className={styles.iconText}
            data-testid={`edit-button-${id}`}
            aria-label="Editar mídia"
          >
            <FaPen /> <span>Editar</span>
          </Button>

          <Button
            aria-label="Adicionar aos favoritos"
            onClick={handleFavoriteClick}
            type="button"
          >
            {isFavorite ? (
              <FaHeart data-testid="favorite-icon" className={iconClass} />
            ) : (
              <FaRegHeart data-testid="favorite-icon" className={iconClass} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Media;
