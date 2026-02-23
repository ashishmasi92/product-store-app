import express from "express";
import * as productController from "../controllers/product.controller";
import {requireAuth} from "@clerk/express"


const productRoutes = express.Router();
// GET all products - public
productRoutes.get("/", productController.getAllProducts);
// GET my products - protected
productRoutes.get("/my",requireAuth(),productController.getMyProducts);
// GET product by id - public
productRoutes.get("/:id",productController.getProductById);
    // POST create product - protected
productRoutes.post("/",requireAuth(),productController.createProduct);
// PUT update product - protected
productRoutes.put("/:id",requireAuth(),productController.updateProduct);
// DELETE product - protected
productRoutes.delete("/:id",requireAuth(),productController.deleteProduct);
export default productRoutes;
