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

export const ProductsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

ProductsRouter.get("/product", getProducts);
ProductsRouter.post("/product", upload.single("image"), postProduct);
ProductsRouter.get("/product/:uuid", getProductById);
ProductsRouter.put("/product/:id", updateProduct);
ProductsRouter.delete("/product/:id", deleteProduct);
ProductsRouter.post("/product/:id/promotion", addPromotion);
ProductsRouter.put("/product/:id/promotion", editPromotion);
ProductsRouter.delete("/product/:id/promotion", deletePromotion);
