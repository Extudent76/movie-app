export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectMovies = (state) => state.movies.movies;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;
export const selectTotalPages = (state) => state.movies.totalPages;
export const selectAuthToken = (state) => state.auth.token;
export const selectCurrentMovie = (state) => state.movies.currentMovie;


