import styles from './Rating.module.css';

interface RatingProps {
  value?: number | null;
}

const Rating = ({ value }: RatingProps) => {
  if (value == null || value === 0) return null;

  const num = parseFloat(String(value));
  const colorClass = num > 7 ? styles.green : num >= 5 ? styles.gray : styles.red;

  return <span className={`${styles.rating} ${colorClass}`}>{num.toFixed(1)}</span>;
};

export default Rating;
