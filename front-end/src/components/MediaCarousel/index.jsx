import React from "react";
import Slider from "react-slick";
import Media from "../Media";
import styles from "./MediaCarousel.module.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};

const MediaCarousel = ({ itens = [], color, onDelete, onFavorite, onEdit }) => (
  <div className={styles.carouselContainer}>
    <Slider {...settings}>
      {itens.map((media) => (
        <div key={media.id} className={styles.slide}>
          <Media
            id={media.id}
            url={media.url}
            title={media.title}
            description={media.description}
            favorite={media.favorite}
            color={color}
            duration={media.duration}
            onDelete={() => onDelete && onDelete(media)}
            onFavorite={(id, newVal) => {
              if (onFavorite) onFavorite({ ...media, favorite: newVal });
            }}
            onEdit={() => onEdit && onEdit(media.id)}
          />
        </div>
      ))}
    </Slider>
  </div>
);

export default MediaCarousel;
