"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const zod = require('zod');
const userSchemaObject = zod.object({
    name: zod.string().min(2).max(64).optional(),
    email: zod.string().email().max(128),
    password: zod.string().min(6).max(64),
});
const userValidator = ({ name, email, password }) => {
    const response = userSchemaObject.safeParse({ name, email, password });
    return response;
};
exports.userValidator = userValidator;
