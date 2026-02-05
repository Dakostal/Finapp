import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/model/userSlice';
import expensesReducer from '../../../features/expense/model/expensesSlice';
import expenseAddReducer from '../../../features/expense/model/expenseAddSlice';
import categoriesReducer from '../../../features/category/model/categoriesSlice';
import expenseHistoryReducer from '../../../features/history/model/expenseHistorySlice';
import themeReducer from '../../../features/theme/model/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
        expenseAdd: expenseAddReducer,
        categories: categoriesReducer,
        expenseHistory: expenseHistoryReducer,
        theme: themeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;