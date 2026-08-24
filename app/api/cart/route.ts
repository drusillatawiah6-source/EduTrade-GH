// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getCartItems } from '@/services/cart.service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await getCartItems(session.user.id);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
