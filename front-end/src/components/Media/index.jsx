import React, { useEffect, useState } from "react";
import styles from "./Media.module.css";
import Button from "../ButtonGeneric";
import classNames from "classnames";
import { favoriteClickHandler } from "../../Handlers/MediaHandlers/index";

import { 
  FaHeart, 
  FaRegHeart, 
  FaTrash, 
  FaPen 
} from "react-icons/fa";

import {
  getYoutubeId,
  getEmbedUrl,
  defaultLoadYouTubeAPI,
} from "../../Utils/yutubeUtils";


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
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const iconClass = classNames({
    [styles.favorito]: isFavorite,
  });

  const handleClick = () => {
    favoriteClickHandler(
      isFavorite,
      setIsFavorite,
      setLoadingFavorite,
      onFavorite,
      id
    );
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
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; presentation"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style={{ border: "none" }}
        />
        <div id={`yt-player-${id}`} style={{ display: "none" }} />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.buttons}>
          <Button
            variant="icon"
            onClick={onDelete}
            className={styles.iconText}
            data-testid={`delete-button-${id}`}
            aria-label="Deletar mídia"
          >
            <FaTrash />
          </Button>

          <Button
            variant="icon"
            onClick={onEdit}
            className={styles.iconText}
            data-testid={`edit-button-${id}`}
            aria-label="Editar mídia"
          >
            <FaPen />
          </Button>

          <Button
            variant="icon"
            aria-label="Adicionar aos favoritos"
            onClick={handleClick}
            type="button"
            disabled={loadingFavorite}
          >
            {loadingFavorite ? (
              <span className={styles.spinner} />
            ) : isFavorite ? (
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
