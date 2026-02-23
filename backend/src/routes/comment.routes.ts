import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller";
import {requireAuth} from "@clerk/express"
const commentRoutes = express.Router();

// POST create comment - protected
commentRoutes.post("/:productId",requireAuth(),createComment)
// DELETE comment - protected   
commentRoutes.delete("/:commentId",requireAuth(),deleteComment)

export default commentRoutes;
