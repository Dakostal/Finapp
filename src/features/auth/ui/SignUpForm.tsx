import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { register } from '../model/userSlice';
import { SignUpSchema, type SignUpFormFields } from '../lib/validation';
import { useRouter } from '@tanstack/react-router';

export const SignUpForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignUpFormFields>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { login: '', password: '', confirmPassword: '' },
    });

    const onSubmit = (data: SignUpFormFields) => {
        const user = { login: data.login, password: data.password };
        dispatch(register(user));
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

            <div>
                <label>Повторите пароль</label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <input type="password" placeholder="Повторите пароль" {...field} />}
                />
                {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};