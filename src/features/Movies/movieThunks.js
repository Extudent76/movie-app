import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    const queryParams = {
      title: params.title ,
      genre: params.genre,
      release_year: params.release_year,
      sort_by: params.sort_by || 'rating',
      order: params.order || 'desc',
      page: params.page || 1,
      limit: params.limit || 10,
    };


    if (!params.title || params.title === 'undefined') {
      delete queryParams.title;
    }
    if (!params.genre || params.genre === '0') {
      delete queryParams.genre;
    }
    if (!params.release_year || params.release_year === '0') {
      delete queryParams.release_year;
    }

    console.log('Query Params:', queryParams);

    try {
      const response = await fetch(`http://localhost:3030/api/v1/search?${new URLSearchParams(queryParams)}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Response Data:', data);
        return data;
      } else {
        console.log('Error Response:', data);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.log('Fetch Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);
