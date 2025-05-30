import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from "../services/authService";
import { loginHandler } from '../Handlers/AuthHandlers/';
import Button from '../components/ButtonGeneric';
import TextInput from '../components/TextInput';
import styles from './Login.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setForm(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler(form, login, navigate, loginUser);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Entrar</h1>

        <label className={styles.label} htmlFor="email">Email</label>
        <TextInput
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label} htmlFor="password">Senha</label>
        <TextInput
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <Button type="submit" className={styles.button}>Entrar</Button>
      </form>
    </div>
  );
}
