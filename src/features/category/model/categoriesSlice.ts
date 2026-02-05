import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../../entities/category/model/types';

interface CategoriesState {
    list: Category[];
}

const LOCAL_STORAGE_KEY = 'categories';

const loadCategories = (): Category[] => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
        { id: '1', title: 'Еда' },
        { id: '2', title: 'Транспорт' },
        { id: '3', title: 'Развлечения' },
        { id: '4', title: 'Здоровье' },
        { id: '5', title: 'Покупки' },
        { id: '6', title: 'Другое' },
    ];
};

const saveCategories = (categories: Category[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
};

const initialState: CategoriesState = {
    list: loadCategories(),
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            if (!state.list.some(c => c.title === action.payload.title)) {
                state.list.push(action.payload);
                saveCategories(state.list);
            }
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(c => c.id !== action.payload);
            saveCategories(state.list);
        },
    },
});

export const { addCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;