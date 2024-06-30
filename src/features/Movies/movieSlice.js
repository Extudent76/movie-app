import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, rateMovie, fetchMovie } from './movieThunks';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    currentMovie: null,
    status: 'idle',
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.search_result;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        const { movieId, userRate } = action.payload;
        const movie = state.movies.find((movie) => movie.id === movieId);
        if (movie) {
          movie.userRating = userRate;
        }
      });
  },
});

export default movieSlice.reducer;
