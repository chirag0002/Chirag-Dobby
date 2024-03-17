import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            token: string;
            user: {
                id: string,
                name: string,
                email: string,
                password: string
                images:[]
            };
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_KEY: string;
        }
    }
}