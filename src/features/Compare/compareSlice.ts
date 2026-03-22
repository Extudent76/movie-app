import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie, CompareState } from '../../types';

const initialState: CompareState = {
  movies: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    toggleCompare: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const idx = state.movies.findIndex(m => m.id === movie.id);
      if (idx !== -1) {
        state.movies.splice(idx, 1);
      } else {
        if (state.movies.length >= 2) {
          state.movies.shift();
        }
        state.movies.push(movie);
      }
    },
    clearCompare: (state) => {
      state.movies = [];
    },
  },
});

export const { toggleCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
