import { z } from 'zod';

export const AddCategorySchema = z.object({
    title: z
        .string()
        .min(1, 'Название категории обязательно')
        .max(50, 'Слишком длинное название')
        .trim(),
});

export type AddCategoryForm = z.infer<typeof AddCategorySchema>;