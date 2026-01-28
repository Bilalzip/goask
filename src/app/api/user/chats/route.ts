import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { Uid } = await req.json();
    if (!Uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const list = await db.select().from(chats).where(eq(chats.userId, Uid));
    return NextResponse.json({ chats: list });
  } catch (err) {
    console.error('user/chats error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

