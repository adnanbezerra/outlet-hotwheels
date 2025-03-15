import Joi from "joi";

const orderItemSchema = Joi.object({
    orderId: Joi.string().required(), // ID do pedido ao qual o item pertence
    productId: Joi.string().required(), // ID do produto
    quantity: Joi.number().min(1).required(), // Quantidade do produto no pedido
    price: Joi.number().min(0).required() // Preço unitário do produto
});

export default orderItemSchema;
