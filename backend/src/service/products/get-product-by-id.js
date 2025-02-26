import { Image } from "../../models/image/index.js";
import { Product } from "../../models/product/index.js";

export async function getProductByIdService(id) {
    const product = await Product.findById(id);

    if (!product) {
        return undefined;
    }

    const image = await Image.findById(product.image);

    if (!image) {
        return product;
    }

    const base64Image = image.img.data.toString("base64");

    const responseJson = {
        ...product._doc,
        image: { contentType: image.img.contentType, base64Image },
    };

    return responseJson;
}
