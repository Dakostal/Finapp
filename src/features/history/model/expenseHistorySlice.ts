import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ExpenseHistoryState {
    filters: {
        category: string;
        startDate: string;
        endDate: string;
    };
}

const initialState: ExpenseHistoryState = {
    filters: {
        category: '',
        startDate: '',
        endDate: '',
    },
};

export const expenseHistorySlice = createSlice({
    name: 'expenseHistory',
    initialState,
    reducers: {
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filters.category = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
            state.filters.startDate = action.payload.startDate;
            state.filters.endDate = action.payload.endDate;
        },
        resetFilters: (state) => {
            state.filters = { category: '', startDate: '', endDate: '' };
        },
    },
});

export const { setCategoryFilter, setDateRange, resetFilters } = expenseHistorySlice.actions;
export default expenseHistorySlice.reducer;