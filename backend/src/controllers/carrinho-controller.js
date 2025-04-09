import { addItemToCart } from "../service/carrinho/add-to-cart.js";
import { getCart } from "../service/carrinho/cart-service.js";
import { completeOrder } from "../service/carrinho/order-service.js";
import { removeItemFromCart } from "../service/carrinho/cart-service.js";

export async function addProductToCart(req, res) {
    const { productId } = req.params;
    const { user } = res.locals;
    const userId = user._id;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    if (!productId) {
        return res.status(400).json({ error: "ID do produto não fornecido" });
    }
    if (!req.body || !req.body.quantity) {
        return res.status(400).json({ error: "Quantidade não fornecida" });
    }
    if (req.body.quantity <= 0) {
        return res.status(400).json({ error: "Quantidade inválida" });
    }

    const { quantity } = req.body;

    try {
        const updatedOrder = await addItemToCart(userId, productId, quantity); // Chama o serviço
        res.status(200).json(updatedOrder); // Retorna o carrinho atualizado
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function viewCart(req, res) {
    const user = res.locals.user;
    const userId = user._id;
    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

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
