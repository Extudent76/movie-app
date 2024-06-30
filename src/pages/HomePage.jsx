import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import Filter from '../widgets/Filter/Filter';
import MovieList from '../widgets/MovieList/MovieList';
import { fetchMovies } from '../features/Movies/movieThunks';
import Loader from '../shared/components/Loader/Loader';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { movies, status, error } = useSelector((state) => state.movies);
  const loading = status === 'loading';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fetchParams = {
      title: params.get('title') || '',
      genre: params.get('genre') || '',
      release_year: params.get('release_year') || '',
      sort_by: params.get('sort_by') || 'rating',
      order: params.get('order') || 'desc',
      page: params.get('page') || 1,
      limit: params.get('limit') || 5,
    };
    console.log('Fetch Params:', fetchParams);
    dispatch(fetchMovies(fetchParams));
  }, [location.search, dispatch]);

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

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.content}>
        <Filter onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <div className={styles.movieListContainer}>
          {status === 'loading' && <Loader />}
          {status === 'failed' && <p>{error}</p>}
          {status === 'succeeded' && <MovieList movies={movies} loading={loading} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
