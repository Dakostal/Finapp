import { SignUpForm } from '../../features/auth/ui/SignUpForm';
import { Link } from '@tanstack/react-router';
import styles from './RegistrationPage.module.scss';

export const RegistrationPage = () => {
    return (
        <div className={styles.container}>
            <h2>Регистрация</h2>

            <div className={styles.formWrapper}>
                <SignUpForm />
            </div>

            <p className={styles.loginLink}>
                Уже есть аккаунт? <Link to="/auth">Войти</Link>
            </p>
        </div>
    );
};