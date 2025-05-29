import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css'; 
import { FaPlay } from "react-icons/fa";
import MenuLink from '../MenuLink';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <h2>
          <span>LuaPlay</span>
          <FaPlay className={styles.playIcon} />
        </h2>
      </div>
      <ul className={styles.navLinks}>
        <li><MenuLink to="/" className={styles.navLink}>Home</MenuLink></li>
        <li><MenuLink to="/newplaylist" className={styles.navLink}>Criar Playlist</MenuLink></li>

        {!user && (
          <>
            <li><MenuLink to="/login" className={styles.navLink}>Login</MenuLink></li>
            <li><MenuLink to="/signup" className={styles.navLink}>Cadastro</MenuLink></li>
          </>
        )}

{user && (
  <li className={styles.navLink}>
    Olá, {user?.username || 'Usuário'}!
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        logout();
      }}
      aria-label="Sair da conta"
      className={styles.logoutLink} 

    >
      Sair
    </a>
  </li>
)}
      </ul>
    </nav>
  );
}
