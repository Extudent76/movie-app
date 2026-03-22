import MovieSnippet from './MovieSnippet';
import type { Movie } from '../../types';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
  onRate?: (id: number, rate: number) => void;
}

const MovieList = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className={styles.noMovies}>
        <p>Фильмы не найдены</p>
        <p>Измените запрос и попробуйте снова</p>
      </div>
    );
  }

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieSnippet key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
