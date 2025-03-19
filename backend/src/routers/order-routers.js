import express from "express";
import { createOrder, getOrderById, addItemToOrder, completeOrder, cancelOrder, getAllOrdersByUser } from "../controllers/order-controller.js";
import { validatingToken } from "../middlewares/validate-auth.js"; 

const router = express.Router();

// Criar pedido 
router.post("/orders", validatingToken, createOrder);

// Buscar pedido por ID 
router.get("/orders/:orderId", validatingToken, getOrderById);

// Adicionar item ao pedido 
router.post("/orders/:orderId/items", validatingToken, addItemToOrder);

// Finalizar pedido 
router.patch("/orders/:orderId/complete", validatingToken, completeOrder);

// Cancelar pedido 
router.patch("/orders/:orderId/cancel", validatingToken, cancelOrder);

// Buscar todos os pedidos de um usuário 
router.get("/orders/user/:userId", validatingToken, getAllOrdersByUser);

export default router;
