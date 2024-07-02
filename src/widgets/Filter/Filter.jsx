import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { GENRES, YEARS } from '../../constants';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange, onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialParams = new URLSearchParams(location.search);


  const [filters, setFilters] = useState({
    genre: initialParams.get('genre') || '0',
    release_year: initialParams.get('release_year') || '0',
    title: initialParams.get('title') || '',
    page: '1'
  });


  const updateSearchParams = useCallback(debounce((newFilters) => {
    const newParams = new URLSearchParams(newFilters);
    navigate({ search: `?${newParams.toString()}` });
  }, 500), []);


  useEffect(() => {
    updateSearchParams(filters);
  }, [filters, updateSearchParams]);

  const handleChange = (key, value) => {
    setFilters(current => ({
      ...current,
      [key]: value,
      page: '1'
    }));
    if (key === 'title') {
      onSearch(value);
    } else {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Фильтр</h3>
      <div className={styles.filterGroup}>
        <label>Жанр</label>
        <select value={filters.genre} onChange={e => handleChange('genre', e.target.value)}>
          {Object.entries(GENRES).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Год выпуска</label>
        <select value={filters.release_year} onChange={e => handleChange('release_year', e.target.value)}>
          {Object.entries(YEARS).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className={styles.searchGroup}>
        <input
          type="text"
          placeholder="Название фильма"
          value={filters.title}
          onChange={e => handleChange('title', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
