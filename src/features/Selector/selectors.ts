import type { RootState } from '../../app/store';

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesStatus = (state: RootState) => state.movies.status;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
export const selectCurrentMovie = (state: RootState) => state.movies.currentMovie;
export const selectHasMore = (state: RootState) => state.movies.hasMore;
export const selectNextCursor = (state: RootState) => state.movies.nextCursor;
export const selectLastSearch = (state: RootState) => state.movies.lastSearch;
