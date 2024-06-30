import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousClick} disabled={currentPage === 1}>
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.00003 17.67C7.81003 17.67 7.62003 17.6 7.47003 17.45L0.950029 10.93C-0.109971 9.87002 -0.109971 8.13002 0.950029 7.07002L7.47003 0.55002C7.76003 0.26002 8.24003 0.26002 8.53003 0.55002C8.82003 0.84002 8.82003 1.32002 8.53003 1.61002L2.01003 8.13002C1.53003 8.61002 1.53003 9.39002 2.01003 9.87002L8.53003 16.39C8.82003 16.68 8.82003 17.16 8.53003 17.45C8.38003 17.59 8.19003 17.67 8.00003 17.67Z" fill="#333333"/>
        </svg>
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.909975 17.67C0.719975 17.67 0.529976 17.6 0.379976 17.45C0.0899756 17.16 0.0899756 16.68 0.379976 16.39L6.89998 9.87002C7.37998 9.39002 7.37998 8.61002 6.89998 8.13002L0.379976 1.61002C0.0899756 1.32002 0.0899756 0.84002 0.379976 0.55002C0.669976 0.26002 1.14998 0.26002 1.43998 0.55002L7.95998 7.07002C8.46998 7.58002 8.75998 8.27002 8.75998 9.00002C8.75998 9.73002 8.47998 10.42 7.95998 10.93L1.43998 17.45C1.28998 17.59 1.09998 17.67 0.909975 17.67Z" fill="#333333"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
