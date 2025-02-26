import { Product } from "../../models/product/index.js";

export async function updateProduct(productId, updatedProductData) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error("Produto não encontrado");
        }

        return updatedProduct;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
    }
}