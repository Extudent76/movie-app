import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCompare } from '../features/Compare/compareSlice';
import Header from '../widgets/Header/Header';
import Rating from '../shared/components/Rating/Rating';
import type { RootState, AppDispatch } from '../app/store';
import type { Movie } from '../types';
import styles from './ComparePage.module.css';

interface Row {
  label: string;
  get: (m: Movie) => string | number | null | undefined;
  isRating: boolean;
}

const ROWS: Row[] = [
  { label: 'Название',     get: m => m.name || m.alternativeName || m.enName || 'Н/Д', isRating: false },
  { label: 'Год выпуска',  get: m => m.year || 'Н/Д', isRating: false },
  { label: 'Рейтинг КП',  get: m => m.rating?.kp ?? null, isRating: true },
  { label: 'Жанры',        get: m => m.genres?.map(g => g.name).join(', ') || 'Н/Д', isRating: false },
  { label: 'Длительность', get: m => m.movieLength ? `${m.movieLength} мин` : 'Н/Д', isRating: false },
];

const ComparePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.compare.movies);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h2>Сравнение фильмов</h2>
        {movies.length === 0 ? (
          <p className={styles.empty}>Выберите до двух фильмов для сравнения на главной странице</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Параметр</th>
                  {movies.map(m => (
                    <th key={m.id}>
                      <Link to={`/movie/${m.id}`}>
                        {m.name || m.alternativeName || 'Без названия'}
                      </Link>
                    </th>
                  ))}
                  {movies.length === 1 && <th className={styles.empty}>—</th>}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => (
                  <tr key={row.label}>
                    <td className={styles.rowLabel}>{row.label}</td>
                    {movies.map(m => (
                      <td key={m.id}>
                        {row.isRating
                          ? <Rating value={row.get(m) as number | null | undefined} />
                          : String(row.get(m) ?? 'Н/Д')}
                      </td>
                    ))}
                    {movies.length === 1 && <td>—</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className={styles.clearBtn} onClick={() => dispatch(clearCompare())}>
              Очистить сравнение
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
