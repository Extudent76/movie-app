export const GENRES: Record<string, string> = {
  'драма': 'Драма',
  'комедия': 'Комедия',
  'боевик': 'Боевик',
  'триллер': 'Триллер',
  'ужасы': 'Ужасы',
  'семейный': 'Семейный',
  'мультфильм': 'Мультфильм',
  'фэнтези': 'Фэнтези',
  'мелодрама': 'Мелодрама',
  'приключения': 'Приключения',
  'мюзикл': 'Мюзикл',
  'военный': 'Военный',
  'криминал': 'Криминал',
  'аниме': 'Аниме',
};

export const YEAR_OPTIONS: number[] = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 2026 - i);

export const API_BASE_URL = 'https://api.poiskkino.dev';
export const API_KEY: string = import.meta.env.VITE_API_KEY || '';
