import { loadS3IntoPinecone } from "@/lib/Pineconedb";
import { getS3Url } from "@/lib/UploadFile";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest , res: NextResponse){
  const body = await req.json();
  const { file_key, file_name , Uid} = body;
  console.log(Uid)
    if (!Uid) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  try {
   const res = await loadS3IntoPinecone(file_key);
   console.log("res" , res)
   const chat_id = await db
   .insert(chats)
   .values({
     fileKey: file_key,
     pdfName: file_name,
     pdfUrl: getS3Url(file_key),
     userId: Uid,
   })
   .returning({
     insertedId: chats.id,
   });
   return NextResponse.json({  chat_id: chat_id[0].insertedId,});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error});
  }
  
}