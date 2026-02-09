import type {NewComment} from "../model/schema"
import {comments} from "../model/schema"
import {db} from "../db/db"
import customResponse from "../utils/customResponse";
import type {Request,Response} from "express";
import {eq} from "drizzle-orm";

export async function  createComment(req:Request,res:Response){
    const data:NewComment = req.body;
    let [comment] = await  db.insert(comments).values(data).returning()
    return customResponse(res,201,true,"comment created",comment)
}


export async function getCommentById(req:Request,res:Response){

    let commentId = req.params.commentid

if(!commentId){
    return customResponse(res,400,false,"invalid  id")
}

const comment = await db.query.comments.findFirst({
    where:eq(comments.id,commentId)
})

    return customResponse(res,200,true,"get comment",comment)

}


export async function deleteComment(){


}

