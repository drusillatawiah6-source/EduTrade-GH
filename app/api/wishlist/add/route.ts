// app/api/wishlist/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { addToWishlist } from '@/services/wishlist.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    const item = await addToWishlist(session.user.id, productId);

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}
