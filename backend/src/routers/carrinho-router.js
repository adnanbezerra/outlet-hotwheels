import express from "express";
import { addProductToCart, viewCart, completeOrderController, removeItem } from "../controllers/carrinho-controller.js";
import { updateOrderStatus } from "../controllers/order-controller.js";
import { validatingToken } from "../middlewares/validate-auth.js"; 

const router = express.Router();

router.post("/cart/:productId", validatingToken, addProductToCart);
router.get("/cart", validatingToken, viewCart);
router.patch("/orders/:orderId/complete", validatingToken, completeOrderController);
router.delete("/cart/orders/:orderId/items/:orderItemId", validatingToken, removeItem);
router.patch("/orders/:orderId/status", validatingToken, updateOrderStatus);

export default router;
