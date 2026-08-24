// lib/validations/cart.ts
import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1).max(100),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1).max(100),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
