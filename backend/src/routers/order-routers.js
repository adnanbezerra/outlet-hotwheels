import express from "express";
import { createOrder, getOrderById, addItemToOrder, completeOrder, cancelOrder, getAllOrdersByUser } from "../controllers/order-controller.js";

const router = express.Router();

// Criar pedido
router.post("/orders", createOrder);

// Buscar pedido por ID
router.get("/orders/:orderId", getOrderById);

// Adicionar item ao pedido
router.post("/orders/:orderId/items", addItemToOrder);

// Finalizar pedido
router.patch("/orders/:orderId/complete", completeOrder);

// Cancelar pedido
router.patch("/orders/:orderId/cancel", cancelOrder);

// Buscar todos os pedidos de um usuário
router.get("/orders/user/:userId", getAllOrdersByUser);

export default router;
