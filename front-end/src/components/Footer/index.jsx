import styles from "./Footer.module.css";
import { FaPlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>

        <h2>
          <span>LuaPlay</span> <FaPlay className={styles.playIcon} />
        </h2>
        <p>© 2025 LuaPlay. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
