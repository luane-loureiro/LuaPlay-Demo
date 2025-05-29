// Form.jsx
import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../ButtonGeneric";
import Dropdown from "../Dropdown";
import styles from "./Form.module.css";

const Form = ({ onSubmit, playlists }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [description, setDescription] = useState("");
  const [mediaLink, setMediaLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !image || !mediaLink || !playlist) return;

    onSubmit({ title, description, image, mediaLink, playlist });
    clearFields();
  };

  const clearFields = () => {
    setTitle("");
    setImage("");
    setPlaylist("");
    setDescription("");
    setMediaLink("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.sectionTitle}>
          <hr />
          <h3>Criar Card</h3>
          <hr />
        </div>

        <div className={styles.columnGroup}>
          <TextInput
            id="title"
            required
            label="Título"
            placeholder="Digite o Título da Mídia"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Dropdown
            id="playlist"
            required
            label="Playlist"
            options={playlists} 
            value={playlist}
            onChange={e => setPlaylist(e.target.value)}
          />
          <TextInput
            id="description"
            label="Descrição"
            placeholder="Digite a Descrição da Mídia"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.columnGroup}>
          <TextInput
            id="image"
            required
            label="Imagem da Mídia"
            placeholder="Digite o Link da Imagem da Mídia"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <TextInput
            id="mediaLink"
            required
            label="Link da Mídia"
            placeholder="Digite o Link para a Mídia"
            value={mediaLink}
            onChange={e => setMediaLink(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <Button type="button" onClick={clearFields}>Limpar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
