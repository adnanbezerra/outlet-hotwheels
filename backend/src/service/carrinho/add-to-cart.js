import Order from "../../models/carrinho/order.js";
import { Product } from "../../models/product/index.js";

export async function addItemToCart(userId, productId, quantity) {
    let order = await Order.findOne({ userId, status: "pending" });

    if (!order) {
        order = new Order({
            userId,
            items: [],
            totalPrice: 0,
            status: "pending"
        });
        await order.save();
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Produto não encontrado");
    }

    let orderItem = order.items.find(item => item.productId.toString() === productId);

    if (orderItem) {
        orderItem.quantity += quantity;
        orderItem.price = product.price * orderItem.quantity;
    } else {
        order.items.push({
            productId: product._id,
            quantity,
            price: product.price * quantity
        });
    }

    order.totalPrice = order.items.reduce((total, item) => total + item.price, 0);

    await order.save();

    return order;
}