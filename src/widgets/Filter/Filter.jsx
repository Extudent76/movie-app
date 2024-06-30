import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { GENRES, YEARS } from '../../constants';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange, onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const handleGenreChange = (e) => {
    params.set('genre', e.target.value);
    navigate({ search: params.toString() });
    onFilterChange({ genre: e.target.value, release_year: params.get('release_year') });
  };

  const handleYearChange = (e) => {
    params.set('release_year', e.target.value);
    navigate({ search: params.toString() });
    onFilterChange({ genre: params.get('genre'), release_year: e.target.value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    params.set('title', value);
    navigate({ search: params.toString() });
    onSearch(value);
  };

  const debouncedHandleSearchChange = useCallback(debounce(handleSearchChange, 500), []);

  return (
    <div className={styles.filterContainer}>
      <h3>Фильтр</h3>
      <div className={styles.filterGroup}>
        <label>Жанр</label>
        <select value={params.get('genre') || '0'} onChange={handleGenreChange}>
          {Object.entries(GENRES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Год выпуска</label>
        <select value={params.get('release_year') || '0'} onChange={handleYearChange}>
          {Object.entries(YEARS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchGroup}>
        <input
          type="text"
          placeholder="Название фильма"
          onChange={debouncedHandleSearchChange}
        />
      </div>
    </div>
  );
};

export default Filter;
