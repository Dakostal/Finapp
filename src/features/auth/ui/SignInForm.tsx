import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { login } from '../model/userSlice';
import { SignInSchema, type SignInFormFields } from '../lib/validation';
import { useRouter } from '@tanstack/react-router';
import styles from './SignInForm.module.scss';

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
                <label>Логин</label>
                <Controller
                    name="login"
                    control={control}
                    render={({ field }) => (
                        <input type="text" placeholder="Логин" {...field} />
                    )}
                />
                {errors.login && <p className={styles.error}>{errors.login.message}</p>}
            </div>

            <div className={styles.field}>
                <label>Пароль</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <input type="password" placeholder="Пароль" {...field} />
                    )}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            <button type="submit" className={styles.submitButton}>
                Войти
            </button>
        </form>
    );
};