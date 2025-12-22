import { SignUpForm } from '../../features/auth/ui/SignUpForm';
import { Link } from '@tanstack/react-router';

export const RegistrationPage = () => {
    return (
        <div>
            <h2>Регистрация</h2>
            <SignUpForm />
            <p>
                Уже есть аккаунт? <Link to="/auth">Войти</Link>
            </p>
        </div>
    );
};