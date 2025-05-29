// NewMedia.jsx
import React from 'react';
import styles from './NewMedia.module.css';  
import Form from '../components/Form';

const NewMedia = ({ playlist, media, setMedia }) => {
  return (
    <div className={styles.divPrincipal}>
      <div className={styles.tituloFormulario}>
        <h1>Novo Video</h1>
        <h2>Complete o formulário para criar um novo card de vídeo.</h2>
      </div>

      <Form
        categorias={playlist.map(item => item.nome)} 
        aoCadastrar={novoVideo => setMedia([...media, novoVideo])} 
      />
    </div>
  );
};

export default NewMedia;