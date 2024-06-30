import React from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '../../shared/components/Star/Star';
import styles from './MovieSnippet.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { rateMovie } from '../../features/Movies/movieThunks';

const MovieSnippet = ({ movie }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRate = (rating) => {
    console.log(`Rating movie ${movie.id} with ${rating}`);
    dispatch(rateMovie({ movieId: movie.id, userRate: rating, token }));
  };

  const handlePosterClick = (event) => {
    event.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={styles.movieSnippet}>
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className={styles.poster}
        onClick={handlePosterClick}
      />
      <div className={styles.details}>
        <h3>{movie.title}</h3>
        <p>Жанр: {movie.genre}</p>
        <p>Год выпуска: {movie.release_year}</p>
        <p>Описание: {movie.description}</p>
        {isAuthenticated && (
          <div className={styles.rating}>
            <span>Оценка:</span>
            <Star rating={movie.userRating || movie.rating} onRate={handleRate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSnippet;
