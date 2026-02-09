import express from "express"
import { createUser, getUserById, updateUser} from "../controllers/user.controller";
import {createProduct} from "../controllers/product.controller";

const router = express.Router()


router.post("/create-user",createUser)
router.get("/user/:id",getUserById)
router.patch("update-user",updateUser)

export default router