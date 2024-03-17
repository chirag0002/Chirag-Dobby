import { NextFunction, Request, Response } from "express";
import { VerifyErrors, verify } from "jsonwebtoken";
import { User } from "../db/db";


export const userAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: false,
            errors: [{
                message: "You need to sign in to proceed.",
                code: "NOT_SIGNEDIN"
            }]
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            errors: [{
                message: "You need to sign in to proceed.",
                code: "NOT_SIGNEDIN"
            }]
        });
    }


    verify(token, process.env.JWT_KEY, async(err:VerifyErrors | null, decoded:any) => {
        if (err) {
            return res.status(401).json({
                errors: [{
                    message: "You need to sign in to proceed.",
                    code: "NOT_SIGNEDIN"
                }]
            });
        }
        try {
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(401).json({
                    errors: [{
                        message: "Auth token is invalid.",
                        code: "INVALID_ACCESS_TOKEN"
                    }]
                });
            }
            if (user.id == decoded.userId) {
                req.user = user;
                next();
            }else {
                return res.status(401).json({
                    errors: [{
                        message: "Auth token is invalid.",
                        code: "INVALID_ACCESS_TOKEN"
                    }]
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                errors: [{
                    message: "Auth token is invalid.",
                    code: "INVALID_ACCESS_TOKEN"
                }]
            });
        }
    });
}