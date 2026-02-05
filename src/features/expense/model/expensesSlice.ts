import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../../entities/expense/model/types';

interface ExpensesState {
    list: Expense[];
}

const LOCAL_STORAGE_KEY = 'expenses';

const loadExpenses = (): Expense[] => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveExpenses = (expenses: Expense[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
};

const initialState: ExpensesState = {
    list: loadExpenses(),
};

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.list.push(action.payload);
            saveExpenses(state.list);
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(exp => exp.id !== action.payload);
            saveExpenses(state.list);
        },
    },
});

export const { addExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;