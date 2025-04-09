import Order from "../../models/carrinho/order.js";

export async function getCart(userId) {
    const order = await Order.findOne({ userId, status: "pending" }).populate("items.productId");

    if (!order || order.items.length === 0) {
        return { message: "Carrinho vazio" };
    }

    order.totalPrice = order.items.reduce((total, item) => total + item.price, 0);

    await order.save();

    return order;
}

export async function removeItemFromCart(orderId, orderItemId) {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
        throw new Error("Pedido não encontrado");
    }

    const orderItem = order.items.find(item => item.productId._id.toString() === orderItemId);
    if (!orderItem) {
        throw new Error("Item não encontrado no pedido");
    }

    order.items.pull(orderItem._id);

    order.totalPrice = order.items.reduce((total, item) => total + item.price, 0);

    await order.save();
    return order;
}

