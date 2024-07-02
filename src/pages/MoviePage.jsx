import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovie, rateMovie } from '../features/Movies/movieThunks';
import Header from '../widgets/Header/Header';
import Loader from '../shared/components/Loader/Loader';
import styles from './MoviePage.module.css';
import Star from '../shared/components/Star/Star';
import { 
  selectCurrentMovie, 
  selectMoviesStatus, 
  selectMoviesError, 
  selectAuthToken 
} from '../features/Selector/selectors';

const MoviePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentMovie = useSelector(selectCurrentMovie);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const token = useSelector(selectAuthToken);
  const [localRating, setLocalRating] = useState(null);

  useEffect(() => {
    console.log(`Fetching movie with id: ${id}`);
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentMovie) {
      setLocalRating(currentMovie.userRating || currentMovie.rating);
    }
  }, [currentMovie]);

  const handleRate = (rating) => {
    console.log(`Dispatching rateMovie for movie ${id} with rating ${rating}`);
    if (token) {
      setLocalRating(rating);
      dispatch(rateMovie({ movieId: id, userRate: rating, token }));
    } else {
      alert('Please log in to rate movies');
    }
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed' || !currentMovie) {
    return <p>{error || "Movie not found"}</p>;
  }

  return (
    <div className={styles.moviePage}>
      <Header />
      <h1>{currentMovie.title}</h1>
      <p>Жанр: {currentMovie.genre || "Н/Д"}</p>
      <p>Год выпуска: {currentMovie.release_year || "Н/Д"}</p>
      <Star rating={localRating} onRate={handleRate} />
      <p>Описание: {currentMovie.description || "Нет описания"}</p>
    </div>
  );
};

export default MoviePage;
