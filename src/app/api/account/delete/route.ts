import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { chats, messages, userProfiles, users } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { Uid, confirm } = await req.json();
    if (!Uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (confirm !== 'DELETE') return NextResponse.json({ error: 'Confirmation mismatch' }, { status: 400 });

    const userChats = await db.select().from(chats).where(eq(chats.userId, Uid));
    for (const c of userChats) {
      await db.delete(messages).where(eq(messages.chatId, c.id));
    }
    await db.delete(chats).where(eq(chats.userId, Uid));
    await db.delete(userProfiles).where(eq(userProfiles.userId, Uid));
    await db.delete(users).where(eq(users.id, Uid));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('delete account error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

