import { Product } from "../models/product/index.js";

export async function updateProduct(req, res) {
    const { id } = req.params;

    const updates = req.body;

    delete updates.image;

    try {
        const product = await Product.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!product) {
            return res.sendStatus(404);
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
