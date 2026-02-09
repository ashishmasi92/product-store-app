import { type NewProduct, products, users} from "../model/schema"
import {eq} from "drizzle-orm";
import type {Request,Response} from "express";
import customResponse from "../utils/customResponse";
import {db} from "../db/db"






export  async function createProduct(req:Request,res:Response){

    try {
        const  data:NewProduct = req.body;
        const  [product] =await  db.insert(products).values(data).returning()

        if(!product){
            return  customResponse(res,400,false,"something went wrong")
        }

        return  customResponse(res,201,true,"created product success",product)

    }catch (e) {
        console.log("error while product create",e)
        return customResponse(res,500,false,"internal error")
    }

}


export async function getAllProduct(req:Request,res:Response){

    const allProducts = await db.query.products.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.created_at)],
    });


    return customResponse(res,200,true,"all product",allProducts)
}


export  async function getProductById(req:Request,res:Response){
    try {

        let id = Number(req.params.id);

        if(!id ){
            return customResponse(res,404,false,"id must be provided")
        }

        if(Number.isNaN(id)){
            return customResponse(res,404,false,"invalid id")
        }
        let product = await  db.query.products.findFirst(
            {
                where:eq(products.id,id),
                with:{user:true,
                    comments:{
                        user:true,
                        orderBy:(comments,{desc})=> [desc(comments.created_at)]
                    }
                },

            }
        )

        return  customResponse(res,200,true,"get product",product)

    }catch (e) {
        console.log("error occur",e)
        return customResponse(res,500,false,"internal error")
    }
}



export  async function getProductByUserId(req:Request,res:Response){

    let userId = req.query.id;

    if(!userId){
        return customResponse(res,401,false,"unauthorized")
    }

    let [product] = await db.query.products.findMany(
        {
            with: {user: true},
            orderBy: (products, {desc}) => [desc(products.created_at)]
        })
    return customResponse(res,200,true,"all prouct By user",product)


}

export  async function updateProduct(req:Request,res:Response){
    try {

        const productId = Number(req.params.id);
        const userId = Number(req.user?.id) // assuming auth middleware
        const data:Partial<NewProduct> = req.body;


        if(Number.isNaN(productId)){
            return customResponse(res,400,false,"invalid user id")
        }

// check user exists

        let user = await db.query.users.findFirst({
            where : eq(users.id,userId)
        })

        if(!user){
            return customResponse(res,401,false,"unauthorized")
        }


        const product = await db.query.products.findFirst({
            where:eq(products.id,productId)
        })

        if(product){
            return customResponse(res,400,false,"product not found")
        }
        // Ownership check
        if(product.user_id !== userId){
            return  customResponse(res,403,false,"forbidden")
        }

        let [updateProduct] = await  db.update(products).set(
            {...data,updatedAt:new Date()}
        ).where(eq(products.id,productId)).returning();

        return  customResponse(res,200,true,"update successfully",updateProduct)
    }catch (e) {
        console.log("error update product",e)
        return customResponse(res,500,false,"internal error")
    }

}



export  async function deleteProduct(req:Request,res:Response){

}