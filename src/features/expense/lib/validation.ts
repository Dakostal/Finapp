import { z } from 'zod';

export const AddExpenseSchema = z.object({
    amount: z
        .string()
        .min(1, 'Сумма обязательна')
        .regex(/^\d+(\.\d{1,2})?$/, 'Некорректный формат суммы (например, 123.45)'),
    category: z.string().min(1, 'Выберите категорию'),
    date: z.string().min(1, 'Дата обязательна'),
    comment: z.string().optional(),
});

export type AddExpenseForm = z.infer<typeof AddExpenseSchema>;