import { SignInForm } from '../../features/auth/ui/SignInForm';
import { Link } from '@tanstack/react-router';

export const AuthPage = () => {
    return (
        <div>
            <h2>Вход</h2>
            <SignInForm />
            <p>
                Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </div>
    );
};