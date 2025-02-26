import { Product } from "../../models/product/index.js";

export async function editPromotion(productId, updatedPromotionData) {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        product.promotion = updatedPromotionData; 
        return await product.save();
    } catch (error) {
        console.error("Erro ao editar promoção:", error);
        throw error;
    }
}