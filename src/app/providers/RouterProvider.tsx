import { createRootRoute, createRoute, createRouter, redirect, RouterProvider} from "@tanstack/react-router"
import { AuthPage } from '../../pages/auth/AuthPage';
import { RegistrationPage } from '../../pages/registration/RegistrationPage';
import { HomePage } from '../../pages/home/HomePage';

const rootRoute = createRootRoute();

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage,
    beforeLoad: () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            throw redirect({ to: '/' });
        }
    },
});

const registrationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/registration',
    component: RegistrationPage,
    beforeLoad: () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            throw redirect({ to: '/' });
        }
    },
});

const HomePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage, 
    beforeLoad: () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            throw redirect({ to: '/auth' });
        }
    },
});

const routeTree = rootRoute.addChildren([ authRoute, registrationRoute, HomePageRoute ]);

export const router = createRouter({ routeTree });

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};