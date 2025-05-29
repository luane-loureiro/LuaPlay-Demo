import styles from './Banner.module.css';
import Button from '../ButtonGeneric';

const Banner = ({ titulo, texto, bannerBackground }) => {
  return (
    <div className={styles.bannerEstilizado}>
      <img
        src={bannerBackground}
        alt="Imagem de fundo do banner"
        className={styles.bannerImg}
      />
      <section className={styles.sectionEstilizada}>
        <div className={styles.videoDescricao}>
          <Button className={styles.ButtonBanner} />
          <h1>{titulo}</h1>
          <p>{texto}</p>
        </div>

        <div className={styles.videoWrapper}>
          <iframe
            src="#"
            title="Teste"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
