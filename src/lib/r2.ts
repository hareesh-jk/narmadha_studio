import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2AccountId = import.meta.env.VITE_R2_ACCOUNT_ID;
const r2AccessKeyId = import.meta.env.VITE_R2_ACCESS_KEY_ID;
const r2SecretAccessKey = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
const r2BucketName = import.meta.env.VITE_R2_BUCKET_NAME;
const r2PublicUrl = import.meta.env.VITE_R2_PUBLIC_URL;

let s3Client: S3Client | null = null;

if (r2AccountId && r2AccessKeyId && r2SecretAccessKey) {
  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccessKeyId,
      secretAccessKey: r2SecretAccessKey,
    },
  });
}

export async function uploadToR2(
  file: File,
  path: string
): Promise<string> {
  if (!s3Client || !r2BucketName) {
    throw new Error('R2 configuration not found');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: r2BucketName,
    Key: path,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);

  return `${r2PublicUrl}/${path}`;
}

export async function deleteFromR2(path: string): Promise<void> {
  if (!s3Client || !r2BucketName) {
    throw new Error('R2 configuration not found');
  }

  const command = new DeleteObjectCommand({
    Bucket: r2BucketName,
    Key: path,
  });

  await s3Client.send(command);
}

export function getR2PublicUrl(path: string): string {
  return `${r2PublicUrl}/${path}`;
}

