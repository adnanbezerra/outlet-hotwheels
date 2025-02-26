import joi from "joi";

export const NewProductSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
});
