import express from "express";
import { addProductToCart, viewCart, completeOrderController, removeItem } from "../controllers/carrinho-controller.js";
import { updateOrderStatus } from "../controllers/order-controller.js";
import { validatingToken } from "../middlewares/validate-auth.js"; 

const router = express.Router();

// Adicionar produto ao carrinho 
router.post("/cart/:productId", validatingToken, addProductToCart);

// Ver carrinho 
router.get("/cart/:userId", validatingToken, viewCart);

// Finalizar pedido 
router.patch("/orders/:orderId/complete", validatingToken, completeOrderController);

// Remover item do carrinho 
router.delete("/cart/orders/:orderId/items/:orderItemId", validatingToken, removeItem);

// Atualizar o status do pedido 
router.patch("/orders/:orderId/status", validatingToken, updateOrderStatus);

export default router;
