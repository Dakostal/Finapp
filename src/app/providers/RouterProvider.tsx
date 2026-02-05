import {
    createRootRoute,
    createRoute,
    createRouter,
    redirect,
    RouterProvider,
    Outlet,
} from '@tanstack/react-router';

import { AuthPage } from '../../pages/auth/AuthPage';
import { RegistrationPage } from '../../pages/registration/RegistrationPage'; 
import { HomePage } from '../../pages/home/HomePage';
import { Dashboard } from '../../widgets/dashboard/Dashboard';
import { CategoriesPage } from '../../pages/categories/CategoriesPage';
import { AddExpensePage } from '../../pages/add-expense/AddExpensePage';
import { HistoryPage } from '../../pages/history/HistoryPage';

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
        </>
    ),
});

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

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'home',
    component: HomePage,
    beforeLoad: () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            throw redirect({ to: '/auth' });
        }
    },
});

const dashboardRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: '/',
    component: Dashboard,
});

const addExpenseRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: '/add-expense',
    component: AddExpensePage,
});

const categoriesRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: '/categories',
    component: CategoriesPage,
});

const historyRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: '/history',
    component: HistoryPage,
});

const routeTree = rootRoute.addChildren([
    authRoute,
    registrationRoute,
    homeRoute.addChildren([
        dashboardRoute,
        addExpenseRoute,
        categoriesRoute,
        historyRoute,
    ]),
]);

export const router = createRouter({ routeTree });

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};