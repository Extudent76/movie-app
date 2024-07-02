import React from 'react';
import MovieSnippet from './MovieSnippet';
import styles from './MovieList.module.css';

const MovieList = ({ movies, onRate }) => {
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
        <MovieSnippet key={movie.id} movie={movie} onRate={onRate} />
      ))}
    </div>
  );
};

export default MovieList;

