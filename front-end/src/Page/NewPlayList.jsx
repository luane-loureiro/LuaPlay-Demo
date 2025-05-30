// src/paginas/NewPlayList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';
import Button from '../components/ButtonGeneric';
import { createPlaylist } from '../services/playlistsService';
import styles from './NewPlayList.module.css';

export default function NewPlayList() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    color: '#00aaff'
  });
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createPlaylist(form, token, logout);
      toast.success('Playlist criada com sucesso!');
      navigate('/');
    } catch (err) {
      toast.error('Erro ao criar playlist: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Criar Nova Playlist</h1>
        <p className={styles.subtitle}>Preencha os campos abaixo</p>

        <TextInput
          label="Nome"
          id="name"
          name="name"
          placeholder="Minha Playlist"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
          labelClassName={styles.label}
        />

        <TextInput
          label="Descrição"
          id="description"
          name="description"
          placeholder="Descrição da playlist"
          value={form.description}
          onChange={handleChange}
          required
          as="textarea"
          className={styles.textarea}
          labelClassName={styles.label}
        />

        <TextInput
          label="Cor"
          id="color"
          name="color"
          type="color"
          value={form.color}
          onChange={handleChange}
          className={styles.colorInput}
          labelClassName={styles.label}
        />

        <Button type="submit" className={styles.button}>
          Criar Playlist
        </Button>
      </form>
    </div>
  );
}
