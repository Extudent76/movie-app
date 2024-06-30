import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovie } from '../features/Movies/movieThunks';
import Loader from '../shared/components/Loader/Loader';
import Star from '../shared/components/Star/Star';
import styles from './MoviePage.module.css';

const MoviePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentMovie, status, error } = useSelector((state) => state.movies);
  
    useEffect(() => {
      console.log(`Fetching movie with id: ${id}`);
      dispatch(fetchMovie(id));
    }, [dispatch, id]);
  
    if (status === 'loading') {
      return <Loader />;
    }
  
    if (status === 'failed' || !currentMovie) {
      return <p>{error || "Movie not found"}</p>;
    }
  
    return (
      <div className={styles.moviePage}>
        <h1>{currentMovie.title}</h1>
        <p>Жанр: {currentMovie.genre || "Н/Д"}</p>
        <p>Год выпуска: {currentMovie.release_year || "Н/Д"}</p>
        <p>Рейтинг: {currentMovie.rating || "Н/Д"}</p>
        <p>Описание: {currentMovie.description || "Нет описания"}</p>
      </div>
    );
  };

export default MoviePage;
