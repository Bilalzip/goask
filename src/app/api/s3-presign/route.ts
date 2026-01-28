import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Missing fileName or fileType" },
        { status: 400 }
      );
    }

    const region = (process.env.AWS_REGION || "").trim();
    const bucket = (process.env.S3_BUCKET_NAME || "").trim();
    const accessKeyId = (process.env.S3_ACCESS_KEY_ID || "").trim();
    const secretAccessKey = (process.env.S3_SECRET_ACCESS_KEY || "").trim();

    if (!region || !bucket || !accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "Server S3 env vars not configured" },
        { status: 500 }
      );
    }

    const s3 = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

    const sanitized = String(fileName)
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    const file_key = `uploads/${Date.now()}-${sanitized}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: file_key,
      ContentType: fileType,
    });


    console.log("command", command)

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
    return NextResponse.json({ uploadUrl, file_key, file_name: sanitized });
  } catch (err) {
    console.error("Presign error:", err);
    return NextResponse.json({ error: "Failed to presign" }, { status: 500 });
  }
}
