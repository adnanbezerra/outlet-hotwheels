import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            //name: { type: String, required: true }, // Nome do produto, te que estar nas infos de compra mas não está funcionando
            quantity: { type: Number, required: true },
            //price: { type: Number, required: true }, // Preço unitário
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    status: { 
        type: String, 
        enum: ["pending", "completed", "canceled"], 
        default: "pending" 
    },
    paymentDetails: { type: Object },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);