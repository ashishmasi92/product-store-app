import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller";
import {requireAuth} from "@clerk/express"
const commmentRoutes = express.Router();


commmentRoutes.post("/:productId",requireAuth,createComment)
commmentRoutes.delete("/:commentId",requireAuth(),deleteComment)

export default commmentRoutes;
