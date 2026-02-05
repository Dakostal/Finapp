import { ExpenseHistoryTable } from '../../features/history/ui/ExpenseHistoryTable';
import styles from './HistoryPage.module.scss';

export const HistoryPage = () => {
    return (
        <div className={styles.container}>
            <h1>История всех расходов</h1>
            <div className={styles.tableWrapper}>
                <ExpenseHistoryTable />
            </div>
        </div>
    );
};