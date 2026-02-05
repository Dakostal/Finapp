import { Provider } from 'react-redux';
import { store } from '../../shared/lib/redux/store';
import type { ReactNode } from 'react';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};