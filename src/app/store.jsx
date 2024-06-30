import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import movieReducer from '../features/Movies/movieSlice';
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;

