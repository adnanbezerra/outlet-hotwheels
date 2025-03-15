import express from "express";
import { addProductToCart, viewCart, completeOrderController, removeItem } from "../controllers/carrinho-controller.js";
import { updateOrderStatus } from "../controllers/order-controller.js";

const router = express.Router();

// Adicionar produto ao carrinho
router.post("/cart/:productId", addProductToCart);

// Ver carrinho
router.get("/cart/:userId", viewCart);

// Finalizar pedido
router.patch("/orders/:orderId/complete", completeOrderController);

// Remover item do carrinho
router.delete("/cart/orders/:orderId/items/:orderItemId", removeItem);

// Atualizar o status do pedido
router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
