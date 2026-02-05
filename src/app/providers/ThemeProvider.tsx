import { useEffect, type ReactNode } from 'react';
import { useAppSelector } from '../../shared/lib/hooks/reduxHooks';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme = useAppSelector(state => state.theme.theme);

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};