const zod = require('zod');

const userSchemaObject = zod.object({
    name: zod.string().min(2).max(64).optional(),
    email: zod.string().email().max(128),
    password: zod.string().min(6).max(64),
});


export const userValidator = ({name, email, password}:{name?:string, email:string, password:string}) => {
    const response = userSchemaObject.safeParse({ name, email, password });
    return response;
};