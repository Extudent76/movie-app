import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie, FavoritesState } from '../../types';

const load = (): Movie[] => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? (JSON.parse(data) as Movie[]) : [];
  } catch {
    return [];
  }
};

const save = (movies: Movie[]): void => {
  localStorage.setItem('favorites', JSON.stringify(movies));
};

const initialState: FavoritesState = {
  movies: load(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.some(m => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
        save(state.movies);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
      save(state.movies);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
