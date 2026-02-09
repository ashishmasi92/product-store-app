import type { NewComment } from "../model/schema";
import * as commentQuery from "../model/queries";
import customResponse from "../utils/customResponse";
import type { Request, Response } from "express";

import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
try {
      let { userId } = getAuth(req);
    
      if (!userId) {
        return customResponse(res, 401, false, "unauthorized");
      }
    
    let productId = req.params.productId;
    let {content}:NewComment = req.body;
    
    
    if(!content){
        return customResponse(res,400,false,"content is required")
    }
    
    let comment = await commentQuery.createComments({userId,productId,content})
    if(!comment){
        return customResponse(res,400,false,"comment not created")
    }
    
    return customResponse(res,201,true,"comment created",comment)
    
    
} catch (error) {
    console.log("error while create comment", error);
    return customResponse(res, 500, false, "internal error");
}
};



export const deleteComment = async (req:Request,res:Response)=>{
try {
    
        let {userId} = getAuth(req);
        if (!userId) {
            return customResponse(res, 401, false, "unauthorized");
          }
    
    
          let commentId = req.params.commentid
          if(!commentId){
            return customResponse(res,400,false,"invalid comment id")
          }
    
          let comment = await commentQuery.deleteComment(commentId) 
          if(!comment){
            return customResponse(res,400,false,"comment not deleted")
          }
          return customResponse(res,200,true,"comment deleted",comment)
} catch (error) {
    const message = (error as Error)?.message;
    if (message === "comment not found with given id") {
      return customResponse(res, 404, false, "comment not found");
    }
    return customResponse(res, 500, false, "internal error");
}
}






// export async function  createComment(req:Request,res:Response){
//     const data:NewComment = req.body;
//     let [comment] = await  db.insert(comments).values(data).returning()
//     return customResponse(res,201,true,"comment created",comment)
// }

// export async function getCommentById(req:Request,res:Response){

//     let commentId = req.params.commentid

// if(!commentId){
//     return customResponse(res,400,false,"invalid  id")
// }

// const comment = await db.query.comments.findFirst({
//     where:eq(comments.id,commentId)
// })

//     return customResponse(res,200,true,"get comment",comment)

// }

// export async function deleteComment(){

// }
