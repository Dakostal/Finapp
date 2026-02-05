import { StoreProvider } from './providers/StoreProvider';
import { AppRouterProvider } from './providers/RouterProvider';
import { ThemeProvider } from './providers/ThemeProvider';

export const App = () => {
    return (
        <StoreProvider>
            <ThemeProvider>
                <AppRouterProvider />
            </ThemeProvider>
            
        </StoreProvider>
    );
};