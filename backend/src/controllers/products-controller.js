import { Product } from "../models/product/index.js";
import { createProduct } from "../service/products/create-product.js";
import { getProductByIdService } from "../service/products/get-product-by-id.js";
import { fetchProductsService } from "../service/products/get-products.js";

export async function getProducts(req, res) {
    const products = await fetchProductsService();

    res.status(200).json(products);
}

export async function postProduct(req, res) {
    const newProduct = req.body;

    const file = req.file;
    try {
        await createProduct(newProduct, file);
    } catch (error) {
        res.status(500).json({ error });
        return;
    }

    res.sendStatus(201);
}

export async function getProductById(req, res) {
    const { uuid } = req.params;

    const product = await getProductByIdService(uuid);

    if (!product) {
        return res.sendStatus(404);
    }

    res.status(200).json(product);
}
