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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = exports.uploadImage = void 0;
const s3_1 = require("../s3/s3");
const db_1 = require("../db/db");
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { name } = req.body;
    const userId = req.user.id;
    const email = req.user.email;
    if (!file || !userId || !name) {
        return res.status(400).json({ message: "details are missing" });
    }
    try {
        const { err, key } = yield (0, s3_1.uploadToS3)(file, userId);
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
        const image = new db_1.Image({
            id: key,
            name: name
        });
        yield image.save();
        const user = yield db_1.User.findOne({ email: email, id: userId });
        user.images.push(image.id);
        yield user.save();
        return res.status(200).json({ message: "Image uploaded successfully", key });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
});
exports.uploadImage = uploadImage;
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { error, presignedUrls } = yield (0, s3_1.getUserPresignedUrls)(userId);
    if (error) {
        return res.status(400).json({ message: "something went wrong" });
    }
    return res.status(200).json({
        urls: presignedUrls
    });
});
exports.getImages = getImages;
