import { z } from 'zod';

const getRegisteredUsers = (): { login: string, password: string }[] => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
};

export const SignInSchema = z.object({
    login: z.string().min(1, 'Логин обязателен'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
}).refine((data) => {
    const users = getRegisteredUsers();
    return users.some(u => u.login === data.login && u.password === data.password);
}, {
    message: 'Неверный логин или пароль',
    path: ['login'], 
});

export const SignUpSchema = z.object({
    login: z.string().min(1, 'Логин обязателен'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
}).refine((data) => {
    const users = getRegisteredUsers();
    return !users.some(u => u.login === data.login);
}, {
    message: 'Логин уже занят',
    path: ['login'],
});

export type SignInFormFields = z.infer<typeof SignInSchema>;
export type SignUpFormFields = z.infer<typeof SignUpSchema>;