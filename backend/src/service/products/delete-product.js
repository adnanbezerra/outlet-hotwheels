import { Product } from "../../models/product/index.js";

export async function deleteProduct(productId) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            throw new Error("Produto não encontrado");
        }

        return deletedProduct;
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
    }
}
