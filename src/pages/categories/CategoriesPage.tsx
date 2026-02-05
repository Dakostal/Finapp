import { CategoryTable } from '../../features/category/ui/CategoryTable';
import { CategoryAddForm } from '../../features/category/ui/AddCategoryForm';
import styles from './CategoriesPage.module.scss';

export const CategoriesPage = () => {
    return (
        <div className={styles.container}>
            <h1>Управление категориями</h1>

            <div className={styles.addForm}>
                <CategoryAddForm />
            </div>

            <div className={styles.tableSection}>
                <CategoryTable />
            </div>
        </div>
    );
};