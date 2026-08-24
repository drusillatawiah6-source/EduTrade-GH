// app/api/wishlist/remove/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { removeFromWishlist } from '@/services/wishlist.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    await removeFromWishlist(session.user.id, productId);

    return NextResponse.json({ message: 'Removed from wishlist' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
