import { Router } from "express";
import { router as userRouter } from "./user.route"
import { router as imageRouter } from "./image.route"

export const router = Router()

router.use('/user', userRouter)
router.use('/image', imageRouter)

