import { Image } from "../../models/image/index.js";
import { Product } from "../../models/product/index.js";

async function saveImage(name, file) {
    if (!file) {
        return null;
    }

    const newImage = new Image({
        name,
        img: {
            data: file.buffer,
            contentType: file.mimetype,
        },
    });

    return await newImage.save();
}

export async function createProduct(productData, file) {
    const { name, price } = productData;

    if (!name || !price) {
        throw new Error("Os campos 'name' e 'price' são obrigatórios.");
    }

    try {
        const savedImage = await saveImage(name, file);

        const newProduct = new Product({
            name,
            price,
            image: savedImage ? savedImage._id : null,
        });

        return await newProduct.save();
    } catch (error) {
        console.error("Erro ao criar o produto:", error);
        throw error;
    }
}
