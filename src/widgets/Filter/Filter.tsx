import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GENRES, YEAR_OPTIONS } from '../../constants';
import styles from './Filter.module.css';

const RATING_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const parseGenres = (values: string[]): string[] => values.map(g => g.replace(/^\+/, ''));

interface FilterProps {
  onSearch: (filters: {
    genres: string[];
    yearFrom: string;
    yearTo: string;
    ratingFrom: string;
    ratingTo: string;
  }) => void;
}

const Filter = ({ onSearch }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    () => parseGenres(searchParams.getAll('genres.name'))
  );
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');
  const [yearTo, setYearTo] = useState(searchParams.get('yearTo') || '');
  const [ratingFrom, setRatingFrom] = useState(searchParams.get('ratingFrom') || '');
  const [ratingTo, setRatingTo] = useState(searchParams.get('ratingTo') || '');

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedGenres.length > 0) {
      const prefix = selectedGenres.length > 1 ? '+' : '';
      selectedGenres.forEach(g => params.append('genres.name', `${prefix}${g}`));
    }
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (yearTo) params.set('yearTo', yearTo);
    if (ratingFrom) params.set('ratingFrom', ratingFrom);
    if (ratingTo) params.set('ratingTo', ratingTo);
    setSearchParams(params);
    onSearch({ genres: selectedGenres, yearFrom, yearTo, ratingFrom, ratingTo });
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Фильтр</h3>

      <div className={styles.filterGroup}>
        <label>Жанры</label>
        <div className={styles.checkboxList}>
          {Object.entries(GENRES).map(([key, label]) => (
            <label key={key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(key)}
                onChange={() => toggleGenre(key)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Год выпуска</label>
        <div className={styles.rangeRow}>
          <select value={yearFrom} onChange={e => setYearFrom(e.target.value)}>
            <option value="">От</option>
            {YEAR_OPTIONS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select value={yearTo} onChange={e => setYearTo(e.target.value)}>
            <option value="">До</option>
            {YEAR_OPTIONS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Рейтинг</label>
        <div className={styles.rangeRow}>
          <select value={ratingFrom} onChange={e => setRatingFrom(e.target.value)}>
            <option value="">От</option>
            {RATING_OPTIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select value={ratingTo} onChange={e => setRatingTo(e.target.value)}>
            <option value="">До</option>
            {RATING_OPTIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <button className={styles.searchButton} onClick={handleSearch}>Найти</button>
    </div>
  );
};

export default Filter;
