import { Link } from '@tanstack/react-router';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>finapp</h2>
      <ul>
        <li>
          <Link 
            to="/" 
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            Дашборд
          </Link>
        </li>
        <li>
          <Link 
            to="/add-expense" 
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            Добавить трату
          </Link>
        </li>
        <li>
          <Link 
            to="/categories" 
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            Категории
          </Link>
        </li>
        <li>
          <Link 
            to="/history" 
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            История
          </Link>
        </li>
      </ul>
    </div>
  );
};