import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get('Uid');
    if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const rows = await db.select().from(userProfiles).where(eq(userProfiles.userId, uid));
    const profile = rows[0] || null;
    return NextResponse.json({ profile });
  } catch (e) {
    console.error('GET /api/profile error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { Uid, fullName, location, about, avatarKey, avatarUrl } = body || {};
    if (!Uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const rows = await db.select().from(userProfiles).where(eq(userProfiles.userId, Uid));
    if (rows.length) {
      const updated = await db
        .update(userProfiles)
        .set({
          fullName: fullName ?? rows[0].fullName,
          location: location ?? rows[0].location,
          about: about ?? rows[0].about,
          avatarKey: avatarKey ?? rows[0].avatarKey,
          avatarUrl: avatarUrl ?? rows[0].avatarUrl,
          updatedAt: new Date(),
        })
        .where(eq(userProfiles.userId, Uid))
        .returning();
      return NextResponse.json({ profile: updated[0] });
    } else {
      const inserted = await db
        .insert(userProfiles)
        .values({ userId: Uid, fullName, location, about, avatarKey, avatarUrl, updatedAt: new Date() })
        .returning();
      return NextResponse.json({ profile: inserted[0] });
    }
  } catch (e) {
    console.error('PATCH /api/profile error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

