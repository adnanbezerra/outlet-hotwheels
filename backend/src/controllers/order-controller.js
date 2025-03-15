import * as orderService from "../service/carrinho/order-service.js";

export async function createOrder(req, res) {
    try {
        const { userId, items } = req.body;
        const order = await orderService.createOrder(userId, items);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function addItemToOrder(req, res) {
    try {
        const { orderId } = req.params;
        const { productId, quantity } = req.body;
        const updatedOrder = await orderService.addItemToOrder(orderId, productId, quantity);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function completeOrder(req, res) {
    try {
        const { orderId } = req.params;
        const updatedOrder = await orderService.completeOrder(orderId);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function cancelOrder(req, res) {
    try {
        const { orderId } = req.params;
        const updatedOrder = await orderService.cancelOrder(orderId);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "canceled"].includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
    }

    try {
        const updatedOrder = await orderService.updateOrderStatus(orderId, status);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllOrdersByUser(req, res) {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId }).populate("items.productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
