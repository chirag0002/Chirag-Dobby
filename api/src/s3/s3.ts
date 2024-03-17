import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Image } from "../db/db";
dotenv.config()

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("AWS credentials are not provided");
}

const credentials: AwsCredentialIdentity = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
};

const s3ClientConfig: S3ClientConfig = {
  credentials: credentials,
  region: region
};

const s3 = new S3Client(s3ClientConfig);

const BUCKET = process.env.BUCKET
export const uploadToS3 = async (file: Express.Multer.File, userId: string) => {
  const key = await `${userId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  })

  try {
    s3.send(command)
    return { key }
  } catch (err) {
    console.error(err)
    return { err }
  }
}


const getImageKeysByUser = async (userId: string) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: userId,
  });

  const { Contents = [] } = await s3.send(command);

  return Contents.sort((a: any, b: any) => {
    const dateA = new Date(a.LastModified).getTime();
    const dateB = new Date(b.LastModified).getTime();
    return dateB - dateA;
  }).map((image: any) => image.Key);

};

const getImageNameFromMongo = (key:string) => {
  return Image.findOne({ id: key }).then((image: any) => image.name);
}


export const getUserPresignedUrls = async (userId: string) => {
  try {
    const imageKeys = await getImageKeysByUser(userId);

    const presignedUrls = await Promise.all(
      imageKeys.map(async (key) => {

        const imageName = await getImageNameFromMongo(key);
        if (!imageName) {
          throw new Error(`Image name not found for key: ${key}`);
        }

        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const url =  await getSignedUrl(s3, command, { expiresIn: 900 });

        return {
          key,
          url,
          name: imageName
        };
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.log(error);
    return { error };
  }
};