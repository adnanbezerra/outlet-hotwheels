import Joi from "joi";

const orderSchema = Joi.object({
    userId: Joi.string().required(), // ID do usuário que fez o pedido
    items: Joi.array().items(Joi.string()), // Lista de IDs de itens do pedido
    totalPrice: Joi.number().min(0).required(), // Preço total do pedido
    status: Joi.string().valid("pending", "completed", "canceled").default("pending") // Estado do pedido
});

export default orderSchema;
