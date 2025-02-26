import { Image } from "../../models/image/index.js";
import { Product } from "../../models/product/index.js";

export async function fetchProductsService() {
    const products = await Product.find();
    const productsWithImages = [];

    for (const product of products) {
        if (!product.image) {
            productsWithImages.push(product);
            continue;
        }

        const image = await Image.findById(product.image);

        const base64Image = image.img.data.toString("base64");
        const contentType = image.img.contentType;

        productsWithImages.push({
            ...product.toObject(),
            image: {
                base64Image,
                contentType,
            },
        });
    }

    return productsWithImages;
}
