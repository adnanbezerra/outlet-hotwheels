// service/carrinho/order-service.js
import Order from "../../models/carrinho/order.js";
import OrderItem from "../../models/carrinho/orderItem.js";
import { Product } from "../../models/product/index.js";

/// Confirma o pagamento de um pedido
export async function confirmPayment(orderId, paymentDetails) {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Pedido não encontrado");
    }

    order.status = "completed";
    order.paymentDetails = paymentDetails; 

    await order.save();
    

    return order;
}

export async function createOrder(userId, items) {

    const itemsWithPrice = await Promise.all(
        items.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Produto com ID ${item.productId} não encontrado`);
            }
            return {
                productId: item.productId,
                //name: product.name, // add nome do produto
                quantity: item.quantity,
                //unitPrice: product.price, // add preço unitário
                price: product.price * item.quantity,
            };
        })
    );

    const totalPrice = itemsWithPrice.reduce((total, item) => total + item.price, 0);

    const order = new Order({ 
        userId, 
        items: itemsWithPrice, 
        totalPrice, 
        status: "pending",
        createdAt: new Date() 
    }); // add data da compra

    console.log("Pedido a ser salvo no banco de dados:", order); 

    await order.save();
    return order;
}

export async function getOrderById(orderId) {
    return await Order.findById(orderId).populate("items.productId");
}

export async function completeOrder(orderId) {
    return await Order.findByIdAndUpdate(orderId, { status: "completed" }, { new: true });
}

export async function cancelOrder(orderId) {
    return await Order.findByIdAndUpdate(orderId, { status: "canceled" }, { new: true });
}

export async function addItemToOrder(orderId, productId, quantity) {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
        throw new Error("Pedido não encontrado");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Produto não encontrado");
    }

    let orderItem = order.items.find(item => item.productId._id.toString() === productId);

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

export async function updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Pedido não encontrado");
    }

    order.status = status;
    await order.save();

    return order;
}
