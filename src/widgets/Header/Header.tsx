import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { selectLastSearch } from '../../features/Selector/selectors';
import styles from './Header.module.css';

function Header() {
  const compareCount = useSelector((state: RootState) => state.compare.movies.length);
  const lastSearch = useSelector(selectLastSearch);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={`/${lastSearch}`} className={styles.header__title}>Фильмопоиск</Link>
        <div className={styles.nav}>
          <Link to="/favorites" className={styles.navLink}>★ Избранное</Link>
          <Link to="/compare" className={styles.navLink}>
            ⇄ Сравнение{compareCount > 0 && <span className={styles.badge}>{compareCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
