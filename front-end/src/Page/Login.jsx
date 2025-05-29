// fonrt-end/src/Page/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from "../services/authService";
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

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(form); // ou sua função que chama o backend
    console.log('Resposta login:', response);

    const { token, user } = response; // aqui pega o user e token
    const { username, email } = user; // username está dentro de user

    login({
      userData: { username, email }, // passa username, não name
      token,
    });

    toast.success('Login realizado com sucesso!');
    navigate('/');
  } catch (err) {
    toast.error('Falha no login: ' + (err.message || 'Erro inesperado'));
  }
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
