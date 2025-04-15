import * as orderService from "../service/carrinho/order-service.js";

//Confirmação do pagamento
export async function confirmPayment(req, res) {
    try {
        const { paymentDetails } = req.body;

        if (!orderId || !paymentDetails) {
            return res
                .status(422)
                .json({ error: "Dados do pagamento são obrigatórios" });
        }

        const updatedOrder = await orderService.confirmPayment(paymentDetails);

        if (!updatedOrder) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createOrder(req, res) {
    try {
        const { userId, items } = req.body;
        if (!userId || !items) {
            return res
                .status(422)
                .json({ error: "Dados do pedido são obrigatórios" });
        }

        const order = await orderService.createOrder(userId, items);
        res.status(201).json(order);
    } catch (error) {
        console.error("Erro ao criar pedido:", error.message);
        res.status(500).json({ error: error.message });
    }
}

export async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
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
        const updatedOrder = await orderService.addItemToOrder(
            orderId,
            productId,
            quantity
        );
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
        const updatedOrder = await orderService.updateOrderStatus(
            orderId,
            status
        );
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
