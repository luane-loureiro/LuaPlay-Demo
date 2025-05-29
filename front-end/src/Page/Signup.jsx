// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Signup.module.css';
import { registerUser } from '../services/authService'; 
import Button from '../components/ButtonGeneric';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form); 
      console.log('Usuário cadastrado:', response);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.error("Erro no cadastro: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.logo}>LuaPlay</h2>
        <p className={styles.subtitle}>Crie sua conta</p>

        <label htmlFor="username" className={styles.label}>Nome</label>
        <input
          id="username"
          name="username"
          type="text"
          className={styles.input}
          placeholder="Seu nome"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="seu@exemplo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className={styles.label}>Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" className={styles.button}>Cadastrar</Button>

        <p className={styles.footerText}>
          Já tem uma conta?{' '}
          <Link to="/login" className={styles.link}>Faça login</Link>
        </p>
      </form>
    </div>
  );
}