import joi from "joi";

export const Login = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});
