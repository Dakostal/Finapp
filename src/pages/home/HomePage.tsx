import { Outlet } from '@tanstack/react-router';
import { Header } from '../../widgets/header/Header';
import { Sidebar } from '../../widgets/sidebar/Sidebar';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={styles.rightColumn}>
        <Header />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};