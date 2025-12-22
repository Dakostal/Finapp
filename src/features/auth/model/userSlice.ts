import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '../../../entities/user/model/types';

const LOCAL_STORAGE_USERS_KEY = 'registeredUsers';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'currentUser';

const loadCurrentUser = (): User | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
};

const initialState: AuthState = {
    currentUser: loadCurrentUser(),
};

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(action.payload));
        },
        register: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(action.payload));

            const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]') as User[];
            if (!users.some(u => u.login === action.payload.login)) {
                users.push(action.payload);
                localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
            }
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
        },
    },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;