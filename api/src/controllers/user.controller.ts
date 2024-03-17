import { Request, Response } from "express";
import { User } from "../db/db";
import { v4 as uuid } from "uuid"
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const id = await uuid();

        const salt = await genSalt()
        const hashedPassword = await hash(password, salt);

        const user = new User({
            id: id,
            name: name,
            email: email,
            password: hashedPassword
        });

        await user.save()

        const token = sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });

        res.status(200).json({
            message: 'user successfully registered',
            token: token,
            user: {
                id: user.id,
                name: user.name
            }

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const token = req.token;
    const user = req.user;


    res.status(200).json({
        message: "successfully signed in",
        token: token,
        user: {
            id: user.id,
            name: user.name
        }
    });

};