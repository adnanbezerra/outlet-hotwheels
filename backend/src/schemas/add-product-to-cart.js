import joi from "joi";

export const AddProductToCart = joi.object({
    userId: joi.string().required(),
    quantity: joi.number().required(),
});
