import { NextFunction, Request, Response } from "express";
import { userValidator } from "../validators/user.validator";
import { User } from "../db/db";


export const userValidation = async (req:Request, res:Response, next:NextFunction) => {
    const { name, email, password } = req.body;

    const validation = userValidator({name, email, password});
    if (!validation.success) {
        const errs = validation.error.errors;
        return res.status(400).json({
            errors: errs.map((err:any) => ({
                param: err.path[0],
                message: err.message,
                code: "INVALID_INPUT"
            }))
        });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                status: false,
                errors: [
                    {
                        param: "email",
                        message: "User with this email address already exists.",
                        code: "RESOURCE_EXISTS"
                    }
                ]
            });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}