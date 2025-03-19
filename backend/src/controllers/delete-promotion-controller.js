import { Product } from "../models/product/index.js";

export async function deletePromotion(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.sendStatus(404);
        }

        product.promotion = undefined;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
