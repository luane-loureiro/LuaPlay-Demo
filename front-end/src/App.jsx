// App.jsx
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Inicio from './Page/index';
import Login from './Page/Login';
import Header from './components/Header';
import EstilosGlobais from './components/EstilosGlobais';
import Footer from './components/Footer';
import Signup from './Page/Signup';
import NewPlaylist from './Page/NewPlayList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <AuthProvider>
      <EstilosGlobais />
      <div className={styles.fundo}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/newplaylist" element={<NewPlaylist />} />
            <Route path="*" element={<div>Página Não Encontrada</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
