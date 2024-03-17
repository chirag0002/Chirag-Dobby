import { NextFunction, Request, Response } from "express"
import { userValidator } from "../validators/user.validator"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { User } from "../db/db"

export const userAuthentication = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;

    const validation = userValidator({ email, password});
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
        if (!user) {
            return res.status(400).json({
                errors: [{
                    param: "email",
                    message: "The credentials you provided are invalid or user does not registered.",
                    code: "INVALID_CREDENTIALS"
                }]
            });
        }

        const match = await compare(password, user.password);

        if (match) {
            const token = sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });
            req.token = token;
            req.user = user;
            next();
        } else {
            return res.status(400).json({
                errors: [{
                    param: "password",
                    message: "The credentials you provided are invalid.",
                    code: "INVALID_CREDENTIALS"
                }]
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}