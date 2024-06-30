import React from 'react';
import Star from '../../shared/components/Star/Star';
import styles from './MovieSnippet.module.css';

const MovieSnippet = ({ movie }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= movie.rating} />);
    }
    return stars;
  };

  return (
    <div className={styles.movieSnippet}>
      <img src={movie.poster} alt={movie.title} />
      <div className={styles.movieInfo}>
        <h3>{movie.title}</h3>
        <p>Жанр: {movie.genre}</p>
        <p>Год выпуска: {movie.release_year}</p>
        <p>Описание: {movie.description}</p>
        <div className={styles.rating}>
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export default MovieSnippet;

