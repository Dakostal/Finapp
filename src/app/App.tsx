import { StoreProvider } from './providers/StoreProvider';
import { AppRouterProvider } from './providers/RouterProvider';

export const App = () => {
    return (
        <StoreProvider>
          <AppRouterProvider />
        </StoreProvider>
    );
};
