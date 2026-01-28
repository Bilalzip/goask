import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { Uid, currentPassword, newPassword } = await req.json();
    if (!Uid || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const rows = await db.select().from(users).where(eq(users.id, Uid));
    if (!rows.length) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const user = rows[0];
    const ok = await bcryptjs.compare(currentPassword, user.password);
    if (!ok) return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(newPassword, salt);
    await db.update(users).set({ password: hashed }).where(eq(users.id, Uid));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('change-password error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

