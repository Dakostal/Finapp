import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/reduxHooks';
import { deleteCategory } from '../model/categoriesSlice';
import styles from './CategoryTable.module.scss';

export const CategoryTable = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.list);

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Удалить категорию "${title}"?`)) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <div className={styles.container}>
            <h2>Список категорий</h2>

            {categories.length === 0 ? (
                <p className={styles.empty}>Категорий пока нет</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th className={styles.actionCell}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.title}</td>
                                <td className={styles.actionCell}>
                                    <button
                                        onClick={() => handleDelete(cat.id, cat.title)}
                                        className={styles.deleteBtn}
                                    >
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