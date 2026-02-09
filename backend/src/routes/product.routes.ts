import express from "express";
import * as productController from "../controllers/product.controller";
import {requireAuth} from "@clerk/express"


const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/my",requireAuth,productController.getMyProducts);
productRoutes.get("/:id",productController.getProductById);
productRoutes.post("/",requireAuth,productController.createProduct);
productRoutes.put("/:id",requireAuth,productController.updateProduct);
productRoutes.delete("/:id",requireAuth,productController.deleteProduct);
export default productRoutes;
