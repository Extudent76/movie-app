export interface Genre {
  name: string;
}

export interface Poster {
  url: string;
  previewUrl?: string;
}

export interface MovieRating {
  kp?: number;
  imdb?: number;
  filmCritics?: number;
}

export interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  enName?: string;
  year?: number;
  description?: string;
  shortDescription?: string;
  genres?: Genre[];
  poster?: Poster;
  rating?: MovieRating;
  movieLength?: number;
  userRating?: number;
}

export interface MoviesResponse {
  docs: Movie[];
  hasNext?: boolean;
  next?: string;
  total?: number;
  limit?: number;
  page?: number;
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface MoviesState {
  movies: Movie[];
  currentMovie: Movie | null;
  status: LoadingStatus;
  error: string | null;
  totalPages: number;
  hasMore: boolean;
  nextCursor: string | null;
  lastSearch: string;
}

export interface FavoritesState {
  movies: Movie[];
}

export interface CompareState {
  movies: Movie[];
}

export interface RootState {
  movies: MoviesState;
  favorites: FavoritesState;
  compare: CompareState;
}
