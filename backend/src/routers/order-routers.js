import express from "express";
import { createOrder, getOrderById, addItemToOrder, completeOrder, cancelOrder, getAllOrdersByUser, } from "../controllers/order-controller.js";
import { confirmPayment } from "../service/carrinho/order-service.js";
import { validatingToken } from "../middlewares/validate-auth.js"; 

const router = express.Router();

router.post("/orders", validatingToken, createOrder);
router.get("/orders/:orderId", validatingToken, getOrderById);
router.post("/orders/:orderId/items", validatingToken, addItemToOrder);
router.patch("/orders/:orderId/complete", validatingToken, completeOrder);
router.patch("/orders/:orderId/cancel", validatingToken, cancelOrder);
router.get("/orders/user/:userId", validatingToken, getAllOrdersByUser);
router.post('/orders/:orderId/confirm-payment', confirmPayment);

export default router;
