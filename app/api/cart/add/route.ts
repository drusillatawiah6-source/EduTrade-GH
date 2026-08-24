// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { addToCart } from '@/services/cart.service';
import { addToCartSchema } from '@/lib/validations/cart';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = addToCartSchema.parse(data);

    const item = await addToCart(session.user.id, validatedData.productId, validatedData.quantity);

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add to cart' }, { status: 500 });
  }
}
