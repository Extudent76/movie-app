import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import Filter from '../widgets/Filter/Filter';
import MovieList from '../widgets/MovieList/MovieList';
import Pagination from '../shared/components/Pagination/Pagination';
import Loader from '../shared/components/Loader/Loader';
import { fetchMovies, rateMovie } from '../features/Movies/movieThunks';
import styles from './HomePage.module.css';
import { 
  selectMovies, 
  selectMoviesStatus, 
  selectMoviesError, 
  selectTotalPages, 
  selectAuthToken 
} from '../features/Selector/selectors';

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const movies = useSelector(selectMovies);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const totalPages = useSelector(selectTotalPages);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fetchParams = {
      title: params.get('title') || '',
      genre: params.get('genre') || '',
      release_year: params.get('release_year') || '',
      sort_by: params.get('sort_by') || 'rating',
      order: params.get('order') || 'desc',
      page: params.get('page') || 1,
      limit: params.get('limit') || 10,
    };
    setCurrentPage(Number(params.get('page')) || 1);
    console.log('Fetch Params:', fetchParams);
    dispatch(fetchMovies(fetchParams));
  }, [location.search, dispatch]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    setCurrentPage(page);
    dispatch(fetchMovies({
      title: params.get('title') || '',
      genre: params.get('genre') || '',
      release_year: params.get('release_year') || '',
      sort_by: params.get('sort_by') || 'rating',
      order: params.get('order') || 'desc',
      page: page,
      limit: params.get('limit') || 10,
    }));
  };

  const handleFilterChange = ({ genre, release_year }) => {
    const params = new URLSearchParams(location.search);
    if (genre && genre !== '0') {
      params.set('genre', genre);
    } else {
      params.delete('genre');
    }
    if (release_year && release_year !== '0') {
      params.set('release_year', release_year);
    } else {
      params.delete('release_year');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    dispatch(fetchMovies({
      title: params.get('title') || '',
      genre: genre !== '0' ? genre : '',
      release_year: release_year !== '0' ? release_year : '',
      sort_by: params.get('sort_by') || 'rating',
      order: params.get('order') || 'desc',
      page: params.get('page') || 1,
      limit: params.get('limit') || 5,
    }));
  };

  const handleSearch = (title) => {
    const params = new URLSearchParams(location.search);
    if (title) {
      params.set('title', title);
    } else {
      params.delete('title');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    dispatch(fetchMovies({
      title: title || '',
      genre: params.get('genre') || '',
      release_year: params.get('release_year') || '',
      sort_by: params.get('sort_by') || 'rating',
      order: params.get('order') || 'desc',
      page: params.get('page') || 1,
      limit: params.get('limit') || 5,
    }));
  };

  const handleRate = (movieId, rating) => {
    console.log(`Dispatching rateMovie for movie ${movieId} with rating ${rating}`);
    const token = useSelector(selectAuthToken);
    dispatch(rateMovie({ movieId, userRate: rating, token }));
  };

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.content}>
        <Filter onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <div className={styles.movieListContainer}>
          {status === 'loading' && <Loader />}
          {status === 'failed' && <p>{error}</p>}
          {status === 'succeeded' && <MovieList movies={movies} onRate={handleRate} />}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default HomePage;
