import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

type TokenType = {
  email: string;
  id: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { email, password } = reqBody;

  const user = (await db
    .select()
    .from(users)
    .where(eq(users.email, email))) as any;

  if (user.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcryptjs.compare(password, user[0].password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Password does not match" },
      { status: 400 }
    );
  }

  const tokenData = {
    email: user[0].email,
    id: user[0].id,
  } as TokenType;

  const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return NextResponse.json({
    email: user[0].email,
    message: "Login successful",
    success: true,
    Uid: user[0].id,
    token,
  });
}