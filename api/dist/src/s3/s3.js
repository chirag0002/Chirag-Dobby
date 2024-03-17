"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPresignedUrls = exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const db_1 = require("../db/db");
dotenv_1.default.config();
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("AWS credentials are not provided");
}
const credentials = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
};
const s3ClientConfig = {
    credentials: credentials,
    region: region
};
const s3 = new client_s3_1.S3Client(s3ClientConfig);
const BUCKET = process.env.BUCKET;
const uploadToS3 = (file, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = yield `${userId}/${(0, uuid_1.v4)()}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    });
    try {
        s3.send(command);
        return { key };
    }
    catch (err) {
        console.error(err);
        return { err };
    }
});
exports.uploadToS3 = uploadToS3;
const getImageKeysByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: userId,
    });
    const { Contents = [] } = yield s3.send(command);
    return Contents.sort((a, b) => {
        const dateA = new Date(a.LastModified).getTime();
        const dateB = new Date(b.LastModified).getTime();
        return dateB - dateA;
    }).map((image) => image.Key);
});
const getImageNameFromMongo = (key) => {
    return db_1.Image.findOne({ id: key }).then((image) => image.name);
};
const getUserPresignedUrls = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageKeys = yield getImageKeysByUser(userId);
        const presignedUrls = yield Promise.all(imageKeys.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const imageName = yield getImageNameFromMongo(key);
            if (!imageName) {
                throw new Error(`Image name not found for key: ${key}`);
            }
            const command = new client_s3_1.GetObjectCommand({ Bucket: BUCKET, Key: key });
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 900 });
            return {
                key,
                url,
                name: imageName
            };
        })));
        return { presignedUrls };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
});
exports.getUserPresignedUrls = getUserPresignedUrls;
