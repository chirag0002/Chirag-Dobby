import { Request, Response } from "express";
import { getUserPresignedUrls, uploadToS3 } from "../s3/s3";
import { Image, User } from "../db/db";

export const uploadImage = async (req: Request, res: Response) => {
    const file = req.file;
    const { name } = req.body
    const userId = req.user.id
    const email = req.user.email

    if (!file || !userId || !name) {
        return res.status(400).json({ message: "details are missing" });
    }

    try {
        const { err, key } = await uploadToS3(file, userId);
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err });
        }

        const image = new Image({
            id: key,
            name: name
        });
        await image.save();

        const user = await User.findOne({ email: email, id: userId })
        user.images.push(image.id)
        await user.save()

        return res.status(200).json({ message: "Image uploaded successfully", key });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
}

export const getImages = async (req: Request, res: Response) => {
    const userId = req.user.id;

    const { error, presignedUrls } = await getUserPresignedUrls(userId);
    if (error) {
        return res.status(400).json({ message: "something went wrong" })
    }

    return res.status(200).json({
        urls: presignedUrls
    });
}