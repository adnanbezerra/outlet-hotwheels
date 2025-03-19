import { Image } from "../models/image/index.js";
import { Product } from "../models/product/index.js";

export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        const image = await Image.findByIdAndDelete(product.image);
        if (!product) {
            return res.sendStatus(404);
        }
        if (!image) {
            return res.sendStatus(404);
        }

        res.status(200).send("Produto deletado com sucesso");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
