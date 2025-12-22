export interface User {
    login: string;
    password: string;
}

export interface AuthState {
    currentUser: User | null;
}