import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_KEY } from '../../constants';
import type { Movie, MoviesResponse } from '../../types';

const headers = {
  'X-API-KEY': API_KEY,
};

export interface FetchMoviesParams {
  limit?: number;
  next?: string;
  append?: boolean;
  genres?: string[];
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
  title?: string;
  page?: number;
}

export const fetchMovies = createAsyncThunk<MoviesResponse, FetchMoviesParams>(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      query.set('limit', String(params.limit || 50));
      query.set('sortField', 'rating.kp');
      query.set('sortType', '-1');

      if (params.next) {
        query.set('next', params.next);
      }

      if (params.genres && params.genres.length > 0) {
        const prefix = params.genres.length > 1 ? '+' : '';
        params.genres.forEach(g => query.append('genres.name', `${prefix}${g}`));
      }
      if (params.yearFrom && params.yearTo) {
        query.append('year', `${params.yearFrom}-${params.yearTo}`);
      } else if (params.yearFrom) {
        query.append('year', params.yearFrom);
      } else if (params.yearTo) {
        query.append('year', params.yearTo);
      }
      if (params.ratingFrom && params.ratingTo) {
        query.append('rating.kp', `${params.ratingFrom}-${params.ratingTo}`);
      } else if (params.ratingFrom) {
        query.append('rating.kp', `${params.ratingFrom}-10`);
      } else if (params.ratingTo) {
        query.append('rating.kp', `1-${params.ratingTo}`);
      }

      if (params.title) {
        const searchQuery = new URLSearchParams({
          query: params.title,
          page: String(params.page || 1),
          limit: String(params.limit || 50),
        });
        const response = await fetch(
          `${API_BASE_URL}/v1.5/movie/search?${searchQuery}`,
          { headers }
        );
        const data: MoviesResponse = await response.json();
        if (response.ok) return data;
        return rejectWithValue(data);
      }

      const response = await fetch(
        `${API_BASE_URL}/v1.5/movie?${query}`,
        { headers }
      );
      const data: MoviesResponse = await response.json();
      if (response.ok) return data;
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMovie = createAsyncThunk<Movie, string | number>(
  'movies/fetchMovie',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1.4/movie/${id}`,
        { headers }
      );
      const data: Movie = await response.json();
      if (response.ok) return data;
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const rateMovie = createAsyncThunk<{ movieId: number; userRate: number }, { movieId: number; userRate: number }>(
  'movies/rateMovie',
  async ({ movieId, userRate }) => {
    return { movieId, userRate };
  }
);
