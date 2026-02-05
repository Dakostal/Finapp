import { useAppSelector } from '../../shared/lib/hooks/reduxHooks';
import { ExpenseAddForm } from '../../features/expense/ui/AddExpenseForm';
import styles from './AddExpensePage.module.scss';

export const AddExpensePage = () => {
    const categories = useAppSelector((state) => state.categories.list || []);

    return (
        <div className={styles.container}>
            <h1>Добавить трату</h1>

            <div className={styles.formContainer}>
                <ExpenseAddForm categories={categories} />
            </div>
        </div>
    );
};