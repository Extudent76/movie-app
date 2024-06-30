import MovieSnippet from './MovieSnippet';
import Loader from '../../shared/components/Loader/Loader';
import styles from './MovieList.module.css';

const MovieList = ({ movies, loading }) => {
  return (
    <div className={styles.movieList}>
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieSnippet key={movie.id} movie={movie} />
        ))
      ) : (
        <div className={styles.noMovies}>
          <p>Фильмы не найдены</p>
          <p>Измените запрос и попробуйте снова</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
