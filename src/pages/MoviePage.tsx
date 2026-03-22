import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovie } from '../features/Movies/movieThunks';
import Header from '../widgets/Header/Header';
import Loader from '../shared/components/Loader/Loader';
import Rating from '../shared/components/Rating/Rating';
import type { AppDispatch } from '../app/store';
import styles from './MoviePage.module.css';
import {
  selectCurrentMovie,
  selectMoviesStatus,
  selectMoviesError,
} from '../features/Selector/selectors';
import image from '../img/image.png';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentMovie = useSelector(selectCurrentMovie);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);

  useEffect(() => {
    if (id) dispatch(fetchMovie(id));
  }, [dispatch, id]);

  if (status === 'loading') return <><Header /><Loader /></>;
  if (status === 'failed' || !currentMovie) return <><Header /><p className={styles.error}>{error || 'Фильм не найден'}</p></>;

  const title = currentMovie.name || currentMovie.alternativeName || currentMovie.enName || 'Без названия';
  const genre = currentMovie.genres?.map(g => g.name).join(', ') || 'Н/Д';
  const year = currentMovie.year || 'Н/Д';
  const description = currentMovie.description || currentMovie.shortDescription || 'Нет описания';
  const rating = currentMovie.rating?.kp;
  const duration = currentMovie.movieLength ? `${currentMovie.movieLength} мин` : null;
  const posterUrl = currentMovie.poster?.url;

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={posterUrl || image} alt={title} className={styles.poster} />
        </div>
        <div className={styles.center}>
          <h1 className={styles.title}>{title} ({year})</h1>
          <h3 className={styles.sectionTitle}>О фильме</h3>
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <td className={styles.label}>Год производства</td>
                <td>{year}</td>
              </tr>
              <tr>
                <td className={styles.label}>Жанр</td>
                <td>{genre}</td>
              </tr>
              {duration && (
                <tr>
                  <td className={styles.label}>Длительность</td>
                  <td>{duration}</td>
                </tr>
              )}
            </tbody>
          </table>
          <h3 className={styles.sectionTitle}>Описание</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.ratingBlock}>
            <span className={styles.ratingValue}><Rating value={rating} /></span>
            <span className={styles.ratingLabel}>рейтинг КиноПоиск</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
