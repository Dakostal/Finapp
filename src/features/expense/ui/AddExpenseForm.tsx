import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../shared/lib/hooks/reduxHooks';
import { addExpense } from '../model/expensesSlice';
import { AddExpenseSchema, type AddExpenseForm } from '../lib/validation';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from '@tanstack/react-router';
import type { Category } from '../../../entities/category/model/types';
import styles from './AddExpenseForm.module.scss';

interface AddExpenseFormProps {
    categories: Category[];
}

export const ExpenseAddForm = ({ categories }: AddExpenseFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddExpenseForm>({
        resolver: zodResolver(AddExpenseSchema),
        defaultValues: {
            amount: '',
            category: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            comment: '',
        },
    });

    const onSubmit = (data: AddExpenseForm) => {
        const expense = {
            id: uuidv4(),
            amount: parseFloat(data.amount),
            category: data.category,
            date: data.date,
            comment: data.comment || undefined,
        };

        dispatch(addExpense(expense));
        reset();
        navigate({ to: '/' });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="amount">Сумма (₽)</label>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="amount"
                            type="text"
                            placeholder="Например: 1500 или 123.45"
                        />
                    )}
                />
                {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="category">Категория</label>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <select {...field} id="category">
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.title}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.category && <p className={styles.error}>{errors.category.message}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="date">Дата</label>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <input {...field} id="date" type="date" />
                    )}
                />
                {errors.date && <p className={styles.error}>{errors.date.message}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="comment">Комментарий (не обязательно)</label>
                <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="comment"
                            type="text"
                            placeholder="Например: Обед в кафе"
                        />
                    )}
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Добавить трату
            </button>
        </form>
    );
};