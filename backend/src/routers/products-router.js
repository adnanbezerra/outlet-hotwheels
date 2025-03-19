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
import { NewProductSchema } from "../schemas/new-product.js";

export const ProductsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Buscar produtos
ProductsRouter.get("/product", getProducts);

// Criar produto
ProductsRouter.post(
    "/product",
    validateSchema(NewProductSchema),
    validatingToken,
    upload.single("image"),
    postProduct
);

// Buscar produto por ID
ProductsRouter.get("/product/:uuid", getProductById);

// Editar produto
ProductsRouter.put("/product/:id", validatingToken, updateProduct);

// Excluir produto
ProductsRouter.delete("/product/:id", validatingToken, deleteProduct);

// Adicionar promoção
ProductsRouter.post(
    "/product/:id/promotion",
    validateSchema(NewPromotionSchema),
    validatingToken,
    addPromotion
);

// Editar promoção
ProductsRouter.put("/product/:id/promotion", validatingToken, editPromotion);

// Excluir promoção
ProductsRouter.delete(
    "/product/:id/promotion",
    validatingToken,
    deletePromotion
);

// Adicionar produto ao carrinho
ProductsRouter.post(
    "/product/:productId/add-to-cart",
    validateSchema(AddProductToCart),
    validatingToken,
    addProductToCart
);
