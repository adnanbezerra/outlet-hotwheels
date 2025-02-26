import { Product } from "../../models/product/index.js";

export async function addPromotion(productId, promotionData) {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        product.promotion = promotionData; 
        return await product.save();
    } catch (error) {
        console.error("Erro ao adicionar promoção:", error);
        throw error;
    }
}