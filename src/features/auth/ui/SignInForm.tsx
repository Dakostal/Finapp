import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { login } from '../model/userSlice';
import { SignInSchema, type SignInFormFields } from '../lib/validation';
import { useRouter } from '@tanstack/react-router';

export const SignInForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignInFormFields>({
        resolver: zodResolver(SignInSchema),
        defaultValues: { login: '', password: '' },
    });

    const onSubmit = (data: SignInFormFields) => {
        const user = { login: data.login, password: data.password };
        dispatch(login(user));
        reset();
        router.navigate({ to: '/' });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Логин</label>
                <Controller
                    name="login"
                    control={control}
                    render={({ field }) => <input type="text" placeholder="Логин" {...field} />}
                />
                {errors.login && <span style={{ color: 'red' }}>{errors.login.message}</span>}
            </div>

            <div>
                <label>Пароль</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <input type="password" placeholder="Пароль" {...field} />}
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>

            <button type="submit">Войти</button>
        </form>
    );
};