import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { toggleTheme } from '../model/themeSlice';
import { useTheme } from '../../../app/providers/useTheme';
import styles from './ThemeToggleButton.module.scss';

export const ThemeToggleButton = () => {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className={styles.button}
            title={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
            aria-label="Переключить тему"
        >
            {theme === 'light' ? 'Темная' : 'Светлая'}
        </button>
    );
};