import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest , res: NextResponse) {

    const body = await req.json();
    const {Uid , ChatId} = body;
    
    if (!Uid) {
      return NextResponse.json({
        message: "Unauthorized"
      });
    }
   
    try {
        const _chats = await db.select().from(chats).where(eq(chats.userId, Uid));
        if (!_chats) {
          return NextResponse.redirect("/");
        }
        if (!_chats.find((chat) => chat.id === parseInt(ChatId))) {
          return NextResponse.redirect("/");
        }
      
        const currentChat = _chats.find((chat) => chat.id === parseInt(ChatId));
    
        return NextResponse.json({
            chats: _chats || [],
            currentChat:currentChat || []
        })
    
    } catch (error) {
        return NextResponse.json(error);
    }
}