// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createOrder } from '@/services/order.service';
import { createOrderSchema } from '@/lib/validations/order';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = createOrderSchema.parse(data);

    const orders = await createOrder(session.user.id, validatedData.cartItemIds, validatedData.buyerNote);

    return NextResponse.json(orders, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
