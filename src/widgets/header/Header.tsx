import { useAppDispatch } from '../../shared/lib/hooks/reduxHooks';
import { logout } from '../../features/auth/model/userSlice';
import { useNavigate } from '@tanstack/react-router';
import { ThemeToggleButton } from '../../features/theme/ui/ThemeToggleButton';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate({ to: '/auth' });
    };

    return (
        <header className={styles.header}>
            <h2>finapp</h2>

            <div className={styles.controls}>
                <ThemeToggleButton />
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </header>
    );
};