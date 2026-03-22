import { useSelector } from 'react-redux';
import Header from '../widgets/Header/Header';
import MovieSnippet from '../widgets/MovieList/MovieSnippet';
import type { RootState } from '../app/store';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h2>Избранное</h2>
        {favorites.length === 0 ? (
          <p className={styles.empty}>Список избранного пуст</p>
        ) : (
          favorites.map(movie => (
            <MovieSnippet key={movie.id} movie={movie} showRemove />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
