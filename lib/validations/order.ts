// lib/validations/order.ts
import { z } from 'zod';

export const createOrderSchema = z.object({
  cartItemIds: z.array(z.string()).min(1, 'At least one item required'),
  buyerNote: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
