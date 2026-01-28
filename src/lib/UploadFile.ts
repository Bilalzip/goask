export async function uploadToS3(
  file: File,
  opts?: { onProgress?: (pct: number) => void }
): Promise<{ file_key: string; file_name: string }> {
  // 1) Ask server for a presigned URL
  const presignRes = await fetch('/api/s3-presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  });

  if (!presignRes.ok) {
    const text = await presignRes.text();
    throw new Error(`Failed to get presigned URL: ${text}`);
  }

  const { uploadUrl, file_key, file_name } = (await presignRes.json()) as {
    uploadUrl: string;
    file_key: string;
    file_name: string;
  };

  // 2) Upload to S3 with progress using XHR
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', file.type);
    // no ACL header — uploads are private unless bucket policy allows otherwise
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && opts?.onProgress) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        opts.onProgress(pct);
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) return resolve();
        return reject(new Error(`S3 upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during S3 upload'));
    xhr.send(file);
  });

  return { file_key, file_name };
}

export function getS3Url(file_key: string) {
  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  if (!bucket || !region) return '';
  return `https://${bucket}.s3.${region}.amazonaws.com/${file_key}`;
}
