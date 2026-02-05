import { SignInForm } from '../../features/auth/ui/SignInForm';
import { Link } from '@tanstack/react-router';

import styles from './AuthPage.module.scss';

export const AuthPage = () => {
    return (
        <div className={styles.container}>
            <h2>Вход</h2>

            <div className={styles.formWrapper}>
                <SignInForm />
            </div>

            <p className={styles.signupLink}>
                Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </div>
    );
};