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
exports.userAuthorization = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../db/db");
const userAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).json({
                errors: [{
                        message: "You need to sign in to proceed.",
                        code: "NOT_SIGNEDIN"
                    }]
            });
        }
        try {
            const user = yield db_1.User.findOne({ email: decoded.email });
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
            }
            else {
                return res.status(401).json({
                    errors: [{
                            message: "Auth token is invalid.",
                            code: "INVALID_ACCESS_TOKEN"
                        }]
                });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                errors: [{
                        message: "Auth token is invalid.",
                        code: "INVALID_ACCESS_TOKEN"
                    }]
            });
        }
    }));
});
exports.userAuthorization = userAuthorization;
