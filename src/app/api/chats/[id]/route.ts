import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { chats, messages } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { Uid, pdfName } = await req.json();
    const chatId = parseInt(params.id, 10);
    if (!Uid || !pdfName || !chatId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updated = await db
      .update(chats)
      .set({ pdfName })
      .where(and(eq(chats.id, chatId), eq(chats.userId, Uid)))
      .returning({ id: chats.id, pdfName: chats.pdfName });

    if (!updated.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ chat: updated[0] });
  } catch (err) {
    console.error('Rename chat error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { Uid } = await req.json();
    const chatId = parseInt(params.id, 10);
    if (!Uid || !chatId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const exists = await db.select().from(chats).where(and(eq(chats.id, chatId), eq(chats.userId, Uid)));
    if (!exists.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await db.delete(messages).where(eq(messages.chatId, chatId));
    await db.delete(chats).where(and(eq(chats.id, chatId), eq(chats.userId, Uid)));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete chat error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

