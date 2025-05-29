import React from "react";
import styles from "./PlayList.module.css";
import MediaCarousel from "../MediaCarousel";
import Button from "../ButtonGeneric";
import { FaTrash, FaPlus } from "react-icons/fa";

const PlayList = ({
  playlist,
  mediaItems = [],
  onDeletePlaylist,
  onDeleteMedia,
  onAddMedia,
  onFavorite,
  onEdit,
}) => (
  <section className={styles.section}>
    <div className={styles.header}>
      <Button
        className={`playlist ${styles.playlistButton}`}
        style={{ backgroundColor: playlist?.color }}
        aria-label={`Playlist ${playlist?.name || "Sem nome"}`}
      >
        {playlist?.name || "Sem nome"}
      </Button>

      <div className={styles.actionButtons}>
        {onAddMedia && (
          <Button
            onClick={onAddMedia}
            className={styles.addButton}
            aria-label={`Adicionar mídia na playlist ${playlist?.name || "Sem nome"}`}
          >
            <FaPlus />
          </Button>
        )}
        {onDeletePlaylist && (
          <Button
            onClick={onDeletePlaylist}
            className={styles.trashButton}
            aria-label={`Deletar playlist ${playlist?.name || "Sem nome"}`}
          >
            <FaTrash />
          </Button>
        )}
      </div>

    </div>

    {mediaItems.length > 0 ? (
      <MediaCarousel
        itens={mediaItems}
        color={playlist?.color}
        duration={playlist?.duration}
        onDelete={onDeleteMedia}
        onFavorite={onFavorite}
        onEdit={onEdit}
      />
    ) : (
      <p>Não há mídias nesta playlist.</p>
    )}
  </section>
);

export default PlayList;
