import {db} from "../db/db"
import { type NewUser, users} from "../model/schema"
import {eq} from "drizzle-orm";
import type {Request,Response} from "express";
import customResponse from "../utils/customResponse";
import {getAuth} from "@clerk/express";
import {upsert} from "../model/queries";





// user queries


export async function createUser(req:Request,res:Response){
    try {
        let userId = getAuth(req)
        if (!userId){
            customResponse(res,401,false,"unauthorized")
        }
        const data:NewUser = req.body

        if(!data.email || !data.password || !data.imageUrl){
            return  customResponse(res,400,false,"all field are required")
        }

        const [user] = await upsert({
            id:userId,
            ...data
        })

        return customResponse(res,201,true,"user created successfully",user)

    }catch (error){
        console.log("created user error",error)

        return  customResponse(res,500,false,"internal error")
    }
}



export  async function getUserById(req:Request,res:Response){
    try {

        const userId = Number(req.params.id)

        if (Number.isNaN(userId)) {
            return customResponse(res, 400, false, "invalid user id")
        }

        if(!userId){
            return  customResponse(res,401,false,"unauthorized")
        }

        let [user] = await  db.select().from(users).where(eq(users.id,userId))

        if (!user) {
            return customResponse(res, 404, false, "user not found")
        }

        return customResponse(res,200,true,"find user by id",user)

    }catch (e) {
        console.log("fetched user error",e)
        return  customResponse(res,500,false,"internal error")
    }

}


export async function updateUser(req: Request, res: Response) {
    try {
        let userId = Number(req.params.id)
        const data :Partial <NewUser> = req.body

        if (Number.isNaN(userId)) {
            return customResponse(res, 400, false, "invalid user ")
        }

        const [user] = await db
            .update(users)
            .set(data)
            .where(eq(users.id, userId))
            .returning()

        if (!user) {
            return customResponse(res, 404, false, "user not found")
        }

        return customResponse(res, 200, true, "user updated", user)
    } catch (error) {
        console.log("update user error", error)
        return customResponse(res, 500, false, "internal error")
    }
}
