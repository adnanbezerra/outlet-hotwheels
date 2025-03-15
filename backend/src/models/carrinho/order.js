import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    status: { 
        type: String, 
        enum: ["pending", "completed", "canceled"], 
        default: "pending" 
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);