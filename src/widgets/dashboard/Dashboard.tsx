import { useAppSelector } from '../../shared/lib/hooks/reduxHooks';
import { format } from 'date-fns';
import { Link } from '@tanstack/react-router';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    console.log('Dashboard рендерится!');

    const expenses = useAppSelector(state => state.expenses.list || []);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const weekExpenses = expenses.filter(e => new Date(e.date) >= startOfWeek);
    const monthExpenses = expenses.filter(e => new Date(e.date) >= startOfMonth);

    const sumWeek = weekExpenses.reduce((sum, e) => sum + e.amount, 0);
    const sumMonth = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const sumTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

    const recent = [...expenses]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <div className={styles.dashboard}>
            <h1>Дашборд</h1>

            <div className={styles.stats}>
                <div className={styles.card}>
                    <h3>За эту неделю</h3>
                    <p>{sumWeek.toFixed(2)} ₽</p>
                </div>
                <div className={styles.card}>
                    <h3>За этот месяц</h3>
                    <p>{sumMonth.toFixed(2)} ₽</p>
                </div>
                <div className={styles.card}>
                    <h3>Всего расходов</h3>
                    <p>{sumTotal.toFixed(2)} ₽</p>
                </div>
            </div>

            <h2>Последние траты</h2>

            {recent.length === 0 ? (
                <p className={styles.empty}>
                    Пока нет трат.{" "}
                    <Link to="/add-expense">Добавить первую трату</Link>
                </p>
            ) : (
                <ul className={styles.recent}>
                    {recent.map(exp => (
                        <li key={exp.id}>
                            <div className={styles.content}>
                                <div>
                                    <strong>{exp.amount.toFixed(2)} ₽</strong>
                                    <span className={styles.category}> — {exp.category}</span>
                                    {exp.comment && (
                                        <span className={styles.comment}>({exp.comment})</span>
                                    )}
                                </div>
                                <span className={styles.date}>
                                    {format(new Date(exp.date), 'dd.MM.yyyy')}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {recent.length >= 5 && (
                <p className={styles.moreLink}>
                    <Link to="/history">Показать все траты →</Link>
                </p>
            )}
        </div>
    );
};