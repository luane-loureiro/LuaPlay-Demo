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
        variant="playlist"
        style={{ backgroundColor: playlist?.color }}
        aria-label={`Playlist ${playlist?.name || "Sem nome"}`}
      >
        <h2 className={styles.playlistTitle}>{playlist?.name || "Sem nome"}</h2>
      </Button>

      <div className={styles.actionButtons}>
        {onAddMedia && (
          <>
<Button
  variant="icon"
  onClick={onAddMedia}
  aria-label={`Adicionar mídia na playlist ${playlist?.name || "Sem nome"}`}
  className={`${styles.addButton}`}
>
  <FaPlus />
</Button>

<Button
  variant="icon"
  onClick={onDeletePlaylist}
  aria-label={`Deletar playlist ${playlist?.name || "Sem nome"}`}
  className={`${styles.trashButton} ${styles.addButton}`}
>
  <FaTrash />
</Button>
          </>
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
      <>
      <p>Não há mídias nesta playlist.</p>
      <p>Para adicionar uma Media clique no botao Adicionar Media.</p>
      </>

    )}
  </section>
);

export default PlayList;
