// app/api/orders/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserOrders } from '@/services/order.service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = (searchParams.get('role') || 'buyer') as 'buyer' | 'seller';

    const orders = await getUserOrders(session.user.id, role);

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
