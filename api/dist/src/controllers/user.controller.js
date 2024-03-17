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
exports.signIn = exports.signUp = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const id = yield (0, uuid_1.v4)();
        const salt = yield (0, bcrypt_1.genSalt)();
        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
        const user = new db_1.User({
            id: id,
            name: name,
            email: email,
            password: hashedPassword
        });
        yield user.save();
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });
        res.status(200).json({
            message: 'user successfully registered',
            token: token,
            user: {
                id: user.id,
                name: user.name
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.signIn = signIn;
