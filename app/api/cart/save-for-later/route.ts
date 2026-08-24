// app/api/cart/save-for-later/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { saveForLater } from '@/services/cart.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { itemId } = await request.json();

    const item = await saveForLater(session.user.id, itemId);

    return NextResponse.json(item);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to save for later' }, { status: 500 });
  }
}
