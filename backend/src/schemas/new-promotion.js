import joi from "joi";

export const NewPromotionSchema = joi.object({
    discount: joi.number().required(),
    description: joi.string(),
});
