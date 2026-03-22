import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/Movies/movieSlice';
import favoritesReducer from '../features/Favorites/favoritesSlice';
import compareReducer from '../features/Compare/compareSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoritesReducer,
    compare: compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
