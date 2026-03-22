import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import Filter from '../widgets/Filter/Filter';
import MovieList from '../widgets/MovieList/MovieList';
import Loader from '../shared/components/Loader/Loader';
import { fetchMovies } from '../features/Movies/movieThunks';
import { resetMovies, setLastSearch } from '../features/Movies/movieSlice';
import type { AppDispatch, RootState } from '../app/store';
import type { LoadingStatus } from '../types';
import styles from './HomePage.module.css';
import {
  selectMovies,
  selectMoviesStatus,
  selectMoviesError,
  selectHasMore,
  selectNextCursor,
  selectLastSearch,
} from '../features/Selector/selectors';

const LIMIT = 50;

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const movies = useSelector(selectMovies);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const hasMore = useSelector(selectHasMore);
  const nextCursor = useSelector(selectNextCursor);
  const lastSearch = useSelector(selectLastSearch);

  const filtersRef = useRef<Record<string, unknown>>({});
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(hasMore);
  const statusRef = useRef<LoadingStatus>(status);
  const nextCursorRef = useRef(nextCursor);

  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { nextCursorRef.current = nextCursor; }, [nextCursor]);

  const buildFilters = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const genres = params.getAll('genres.name').map(g => g.replace(/^\+/, ''));
    return {
      genres,
      yearFrom: params.get('yearFrom') || '',
      yearTo: params.get('yearTo') || '',
      ratingFrom: params.get('ratingFrom') || '',
      ratingTo: params.get('ratingTo') || '',
      limit: LIMIT,
    };
  }, [location.search]);

  useEffect(() => {
    // Если фильтры не изменились и фильмы уже загружены — не перезапрашиваем
    if (location.search === lastSearch && movies.length > 0) {
      filtersRef.current = buildFilters();
      return;
    }
    dispatch(setLastSearch(location.search));
    dispatch(resetMovies());
    filtersRef.current = buildFilters();
    dispatch(fetchMovies({ ...filtersRef.current, append: false }));
  }, [location.search, dispatch, buildFilters]);

  const loadMore = useCallback(() => {
    if (statusRef.current === 'loading' || !hasMoreRef.current) return;
    dispatch(fetchMovies({ ...filtersRef.current, next: nextCursorRef.current ?? undefined, append: true }));
  }, [dispatch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.content}>
        <Filter onSearch={() => {}} />
        <div className={styles.movieListContainer}>
          {status === 'failed' && <p>{error}</p>}
          <MovieList movies={movies} />
          {status === 'loading' && <Loader />}
          <div ref={sentinelRef} style={{ height: 40 }} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
