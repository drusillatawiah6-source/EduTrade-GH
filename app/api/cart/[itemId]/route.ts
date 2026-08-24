// app/api/cart/[itemId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateCartItem, removeFromCart } from '@/services/cart.service';
import { updateCartItemSchema } from '@/lib/validations/cart';

export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = updateCartItemSchema.parse(data);

    const item = await updateCartItem(session.user.id, params.itemId, validatedData.quantity);

    return NextResponse.json(item);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await removeFromCart(session.user.id, params.itemId);

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}
