import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ExpenseAddState {
    isSubmitting: boolean;
    error: string | null;
}

const initialState: ExpenseAddState = {
    isSubmitting: false,
    error: null,
};

export const expenseAddSlice = createSlice({
    name: 'expenseAdd',
    initialState,
    reducers: {
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setSubmitting, setError } = expenseAddSlice.actions;
export default expenseAddSlice.reducer;