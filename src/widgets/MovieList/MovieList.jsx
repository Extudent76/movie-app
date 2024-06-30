import React from 'react';
import MovieSnippet from './MovieSnippet';
import styles from './MovieList.module.css';

const MovieList = ({ movies, onRate }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieSnippet key={movie.id} movie={movie} onRate={onRate} />
      ))}
    </div>
  );
};

export default MovieList;
