// lib/validations/product.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  categoryId: z.string().min(1, 'Please select a category'),
  price: z.coerce.number().min(0.1, 'Price must be greater than 0'),
  isNegotiable: z.boolean().default(false),
  condition: z.enum(['BRAND_NEW', 'LIKE_NEW', 'GOOD', 'FAIR']),
  school: z.string().optional(),
  region: z.string().optional(),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1').max(100),
  contactPreference: z.enum(['CALL', 'TEXT', 'WHATSAPP', 'EMAIL']),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
