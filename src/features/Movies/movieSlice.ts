import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, rateMovie, fetchMovie } from './movieThunks';
import type { MoviesState } from '../../types';

const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  status: 'idle',
  error: null,
  totalPages: 1,
  hasMore: true,
  nextCursor: null,
  lastSearch: '',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.totalPages = 1;
      state.hasMore = true;
      state.nextCursor = null;
      state.status = 'idle';
    },
    setLastSearch: (state, action: import('@reduxjs/toolkit').PayloadAction<string>) => {
      state.lastSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newDocs = action.payload.docs || [];
        if (action.meta.arg.append) {
          state.movies = [...state.movies, ...newDocs];
        } else {
          state.movies = newDocs;
        }
        state.nextCursor = action.payload.next || null;
        state.hasMore = !!action.payload.hasNext;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        const payload = action.payload as { message?: string } | string | undefined;
        state.error = (typeof payload === 'object' ? payload?.message : payload) ?? 'Ошибка загрузки';
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
        const payload = action.payload as { message?: string } | string | undefined;
        state.error = (typeof payload === 'object' ? payload?.message : payload) ?? 'Ошибка загрузки';
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        const { movieId, userRate } = action.payload;
        const movie = state.movies.find((m) => m.id === movieId);
        if (movie) movie.userRating = userRate;
      });
  },
});

export const { resetMovies, setLastSearch } = movieSlice.actions;
export default movieSlice.reducer;
