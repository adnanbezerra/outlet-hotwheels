import { Product } from "../../models/product/index.js";

export async function deletePromotion(productId) {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        product.promotion = undefined; 
        return await product.save();
    } catch (error) {
        console.error("Erro ao excluir promoção:", error);
        throw error;
    }
}