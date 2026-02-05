import { createContext } from 'react';
import type { Theme } from '../../entities/theme/model/types';

export interface ThemeContextType {
    theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);