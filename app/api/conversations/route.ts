// app/api/conversations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getConversations } from '@/services/message.service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await getConversations(session.user.id);
    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
