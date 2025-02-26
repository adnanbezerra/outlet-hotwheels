import mongoose from "mongoose";
import { mongoConnection } from "../../database/mongodb.js";

const productSchema = new mongoConnection.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    promotion: { type: Boolean, default: false },
    promotionDetails: { type: { discount: Number, description: String } },
});

export const Product = mongoConnection.model("Product", productSchema);
