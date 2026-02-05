import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { addCategory } from '../model/categoriesSlice';
import { AddCategorySchema, type AddCategoryForm } from '../lib/validation';
import styles from './AddCategoryForm.module.scss';

export const CategoryAddForm = () => {
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddCategoryForm>({
        resolver: zodResolver(AddCategorySchema),
        defaultValues: {
            title: '',
        },
    });

    const onSubmit = (data: AddCategoryForm) => {
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const newId = categories.length > 0
            ? String(Math.max(...categories.map((c: { id: string }) => parseInt(c.id))) + 1)
            : '1';

        const newCategory = {
            id: newId,
            title: data.title.trim(),
        };

        dispatch(addCategory(newCategory));
        reset();
    };

    return (
        <div className={styles.container}>
            <h3>Добавить новую категорию</h3>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Например: Подписки"
                            />
                        )}
                    />
                    {errors.title && (
                        <p className={styles.error}>{errors.title.message}</p>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>
                    Добавить
                </button>
            </form>
        </div>
    );
};