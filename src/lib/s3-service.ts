import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const region = process.env.AWS_REGION as string;
      const bucket = process.env.S3_BUCKET_NAME as string;
      const accessKeyId = process.env.S3_ACCESS_KEY_ID as string;
      const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

      const s3 = new S3({
        region,
        credentials: { accessKeyId, secretAccessKey },
      });
      const command = new GetObjectCommand({ Bucket: bucket, Key: file_key });
      const obj = await s3.send(command);

      const tmpDir = '/tmp';
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
      const file_name = path.join(tmpDir, `${Date.now().toString()}.pdf`);

      const body = obj.Body as Readable | undefined;
      if (body) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function () {
          body.pipe(file).on("finish", () => resolve(file_name));
        });
      } else {
        reject(new Error('Empty S3 object body'));
      }
    } catch (error) {
      console.error(error);
      reject(error);
      return null as any;
    }
  });
}
