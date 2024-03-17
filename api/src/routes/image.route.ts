import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { userAuthorization } from "../middlewares/userAuthorization";
import { getImages, uploadImage } from "../controllers/image.controller";

export const router = Router()

const storage = memoryStorage()
const upload = multer({ storage })

router.post('/upload', userAuthorization, upload.single('image'), uploadImage)
router.get('/', userAuthorization, getImages)
