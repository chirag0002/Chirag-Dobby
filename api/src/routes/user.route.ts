import { Router } from "express";
import { userValidation } from "../middlewares/userValiadtion";
import { userAuthentication } from "../middlewares/userAuthentication";
import { signIn, signUp } from "../controllers/user.controller";

export const router = Router()


router.post('/signup', userValidation, signUp);
router.post('/signin', userAuthentication, signIn);