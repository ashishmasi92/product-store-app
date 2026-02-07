import {db} from "../db/db"
import {User, NewUser, users, NewProduct, products} from "../model/schema"
import {eq} from "drizzle-orm";
import type {Request,Response} from "express";
import customResponse from "../utils/customResponse";


// user queries


export async function createUser(req:Request,res:Response){

    let data:NewUser = req.body
    const [user] = await  db.insert(users).values(data).returning()
return customResponse(res,201,true,"user created successfully",user)
}



export  async function getUserById(req:Request,res:Response){

    let userId = req.params.id

    let [user] = await  db.select().from(users).where(eq(users.id,userId))

    return customResponse(res,200,true,"find user by id",user)

}


export async function updateUser(req:Request,res:Response){

    const userId = req.params.id;
    const data = req.body

    if(!userId){
        return customResponse(res,400,false,"id must be required")
    }

    let [user] = await db.update(users).set(data).where(eq(users.id,userId)).returning()

}



export  async function createProduct(req:Request,res:Response){
    let data:NewProduct = req.body;

    let [product] = await  db.insert(products).values(data);

    return customResponse(res,201,true,"create product",product)

}




