import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller";
import {requireAuth} from "@clerk/express"
const commentRoutes = express.Router();


commentRoutes.post("/:productId",requireAuth(),createComment)
commentRoutes.delete("/:commentId",requireAuth(),deleteComment)

export default commentRoutes;
