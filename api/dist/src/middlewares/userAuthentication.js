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
exports.userAuthentication = void 0;
const user_validator_1 = require("../validators/user.validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const db_1 = require("../db/db");
const userAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validation = (0, user_validator_1.userValidator)({ email, password });
    if (!validation.success) {
        const errs = validation.error.errors;
        return res.status(400).json({
            errors: errs.map((err) => ({
                param: err.path[0],
                message: err.message,
                code: "INVALID_INPUT"
            }))
        });
    }
    try {
        const user = yield db_1.User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                errors: [{
                        param: "email",
                        message: "The credentials you provided are invalid or user does not registered.",
                        code: "INVALID_CREDENTIALS"
                    }]
            });
        }
        const match = yield (0, bcrypt_1.compare)(password, user.password);
        if (match) {
            const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });
            req.token = token;
            req.user = user;
            next();
        }
        else {
            return res.status(400).json({
                errors: [{
                        param: "password",
                        message: "The credentials you provided are invalid.",
                        code: "INVALID_CREDENTIALS"
                    }]
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.userAuthentication = userAuthentication;
