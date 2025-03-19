import { addItemToCart } from "../service/carrinho/add-to-cart.js";
import { getCart } from "../service/carrinho/cart-service.js";
import { completeOrder } from "../service/carrinho/order-service.js";
import { removeItemFromCart } from "../service/carrinho/cart-service.js";

export async function addProductToCart(req, res) {
    const { productId } = req.params;
    const { userId, quantity } = req.body;

    try {
        const updatedOrder = await addItemToCart(userId, productId, quantity);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function viewCart(req, res) {
    const { userId } = req.params;
    try {
        const cart = await getCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        console.error("Erro ao buscar o carrinho:", error);
        res.status(400).json({ error: error.message });
    }
}

export async function completeOrderController(req, res) {
    const { orderId } = req.params;
    try {
        const updatedOrder = await completeOrder(orderId);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function removeItem(req, res) {
    const { orderId, orderItemId } = req.params;
    try {
        const updatedOrder = await removeItemFromCart(orderId, orderItemId);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
