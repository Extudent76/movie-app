import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, rateMovie } from './movieThunks';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
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
        state.error = action.error.message;
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
