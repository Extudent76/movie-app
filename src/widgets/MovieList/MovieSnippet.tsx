import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../../features/Favorites/favoritesSlice';
import { toggleCompare } from '../../features/Compare/compareSlice';
import ConfirmModal from '../../shared/components/ConfirmModal/ConfirmModal';
import Rating from '../../shared/components/Rating/Rating';
import type { RootState, AppDispatch } from '../../app/store';
import type { Movie } from '../../types';
import styles from './MovieSnippet.module.css';
import image from '../../img/image.png';

interface MovieSnippetProps {
  movie: Movie;
  showRemove?: boolean;
}

const MovieSnippet = ({ movie, showRemove = false }: MovieSnippetProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const compareMovies = useSelector((state: RootState) => state.compare.movies);
  const isFavorite = favorites.some(m => m.id === movie.id);
  const isCompared = compareMovies.some(m => m.id === movie.id);
  const [showModal, setShowModal] = useState(false);

  const title = movie.name || movie.alternativeName || movie.enName || 'Без названия';
  const posterUrl = movie.poster?.url;
  const genre = movie.genres?.map(g => g.name).join(', ') || 'Н/Д';
  const year = movie.year || 'Н/Д';
  const description = movie.shortDescription || movie.description || 'Нет описания';
  const rating = movie.rating?.kp || movie.rating?.imdb;

  const handleAddClick = () => { if (!isFavorite) setShowModal(true); };
  const handleConfirm = () => { dispatch(addFavorite(movie)); setShowModal(false); };
  const handleRemove = () => { dispatch(removeFavorite(movie.id)); };
  const handleToggleCompare = () => { dispatch(toggleCompare(movie)); };

  return (
    <div className={styles.movieSnippet}>
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl || image} alt={title} className={styles.poster} />
      </Link>
      <div className={styles.details}>
        <Link to={`/movie/${movie.id}`} className={styles.title}>{title}</Link>
        <p>Жанр: {genre}</p>
        <p>Год выпуска: {year}</p>
        <p>Описание: {description}</p>
        {rating != null && <p>Оценка: <Rating value={rating} /></p>}
        <div className={styles.actions}>
          {showRemove ? (
            <button className={styles.removeBtn} onClick={handleRemove}>Удалить из избранного</button>
          ) : (
            <button
              className={isFavorite ? styles.favBtnActive : styles.favBtn}
              onClick={handleAddClick}
              disabled={isFavorite}
            >
              {isFavorite ? '★ В избранном' : '☆ В избранное'}
            </button>
          )}
          <button
            className={isCompared ? styles.compareBtnActive : styles.compareBtn}
            onClick={handleToggleCompare}
          >
            {isCompared ? '⊖ Убрать из сравнения' : '⊕ Сравнить'}
          </button>
        </div>
      </div>
      {showModal && (
        <ConfirmModal
          message={`Добавить «${title}» в избранное?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MovieSnippet;
