import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

type UserCred = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const body: UserCred = await req.json();
  const { email, password } = body;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUserId = uuidv4();

    const UserToken = await db
      .insert(users)
      .values({
        id: newUserId,
        email: email,
        password: hashedPassword,
      })
      .returning({
        insertedId: users.id,
        insertedEmail: users.email,
        password: users.password,
      });

    return NextResponse.json({
      success: true,
      message: "Account has been created",
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "User already exists with this ID" },
        { status: 409 }
      );
    }
    console.error("Login error:", error.code, error.message);
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 401 }
    );
  }
}