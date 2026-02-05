import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/reduxHooks';
import { deleteExpense } from '../../expense/model/expensesSlice';
import { resetFilters, setCategoryFilter, setDateRange } from '../model/expenseHistorySlice';
import { format } from 'date-fns';

import styles from './ExpenseHistoryTable.module.scss';

export const ExpenseHistoryTable = () => {
    const dispatch = useAppDispatch();
    const expenses = useAppSelector(state => state.expenses.list || []);
    const filters = useAppSelector(state => state.expenseHistory.filters);
    const categories = useAppSelector(state => state.categories.list || []);

    const filteredExpenses = expenses.filter(exp => {
        const matchesCategory = !filters.category || exp.category === filters.category;
        const expDate = new Date(exp.date);

        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;

        const matchesStart = !start || expDate >= start;
        const matchesEnd = !end || expDate <= end;

        return matchesCategory && matchesStart && matchesEnd;
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Удалить эту трату?')) {
            dispatch(deleteExpense(id));
        }
    };

    return (
        <div className={styles.container}>
            <h1>История расходов</h1>

            <div className={styles.filters}>
                <div>
                    <label>Категория</label>
                    <select
                        value={filters.category}
                        onChange={e => dispatch(setCategoryFilter(e.target.value))}
                    >
                        <option value="">Все категории</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.title}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Дата от</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={e => dispatch(setDateRange({ ...filters, startDate: e.target.value }))}
                    />
                </div>

                <div>
                    <label>Дата до</label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={e => dispatch(setDateRange({ ...filters, endDate: e.target.value }))}
                    />
                </div>

                <button onClick={() => dispatch(resetFilters())}>
                    Сбросить фильтры
                </button>
            </div>

            {filteredExpenses.length === 0 ? (
                <p className={styles.empty}>Нет расходов по выбранным фильтрам</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Категория</th>
                            <th>Комментарий</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map(exp => (
                            <tr key={exp.id}>
                                <td>{format(new Date(exp.date), 'dd.MM.yyyy')}</td>
                                <td>{exp.amount} ₽</td>
                                <td>{exp.category}</td>
                                <td>{exp.comment || '-'}</td>
                                <td>
                                    <button onClick={() => handleDelete(exp.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};