import { Router } from "express";
import {
    getProductById,
    getProducts,
    postProduct,
} from "../controllers/products-controller.js";
import multer from "multer";
import { addPromotion } from "../controllers/add-promotion-controller.js";
import { editPromotion } from "../controllers/edit-promotion-controller.js";
import { deletePromotion } from "../controllers/delete-promotion-controller.js";
import { updateProduct } from "../controllers/edit-product-controller.js";
import { deleteProduct } from "../controllers/delete-product-controller.js";
import { addProductToCart } from "../controllers/carrinho-controller.js";
import { validatingToken } from "../middlewares/validate-auth.js";
import { NewPromotionSchema } from "../schemas/new-promotion.js";
import { validateSchema } from "../middlewares/validate-joi-schema.js";
import { AddProductToCart } from "../schemas/add-product-to-cart.js";

export const ProductsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

ProductsRouter.get("/product", getProducts);

ProductsRouter.post(
    "/product",
    // validatingToken,
    upload.single("image"),
    postProduct
);

ProductsRouter.get("/product/:uuid", getProductById);

ProductsRouter.put("/product/:id", validatingToken, updateProduct);

ProductsRouter.delete("/product/:id", validatingToken, deleteProduct);

ProductsRouter.post(
    "/product/:id/promotion",
    validateSchema(NewPromotionSchema),
    validatingToken,
    addPromotion
);

ProductsRouter.put("/product/:id/promotion", validatingToken, editPromotion);

ProductsRouter.delete(
    "/product/:id/promotion",
    validatingToken,
    deletePromotion
);

ProductsRouter.post(
    "/product/:productId/add-to-cart",
    validateSchema(AddProductToCart),
    validatingToken,
    addProductToCart
);
