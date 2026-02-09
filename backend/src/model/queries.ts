import {db} from "../db/db"
import type {NewProduct, NewUser} from "./schema";
import {products, users} from "./schema";
import {eq} from "drizzle-orm";

// User queries

export const createUser = async (data:NewUser) =>{
    const [user] = await db.insert(users).values(data).returning();
    return user
}


export const getUserById  = async (id:Number)=>{

    return   db.query.users.findFirst({
        where:eq(users.id,id)
    })

}

    export const updateUser = async (id:Number,data:Partial<NewUser>)=>{

    let userExist = await getUserById(id)
    if(!userExist){
throw  new Error('user not found with given id')
    }
    let [user] = await  db.update(users).set(data).returning()
    return user
}


export const upsert = async (data:NewUser)=>{

    const [user]  = await  db.insert(users).values(data).onConflictDoUpdate({
        target:users.id,
        set:data
    }).returning()
    return user
}


//  product queries

export const createProduct = async (data:NewProduct)=>{
    const [product] = await db.insert(products).values(data).returning()
    return product
}


export const getProductById = async (id:string)=>{
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with:{user:true,
            comments:{
                with:{user:true},
                orderBy:(comments,{desc})=> [desc(comments.createdAt)]

            }
        },

    })
}

export const getAllProducts = async ()=>{
    return db.query.products.findMany({with:{user:true},
    orderBy:(products,{desc})=> [desc(products.createdAt)]
    })
} 


export const getAllProductsByUserId = async (userId:string)=>{

    return db.query.products.findMany({
        with:{user:true},
           orderBy:(products,{desc})=> [desc(products.createdAt)]
    })
}


export const updateProduct = async (id:string,data:Partial<NewProduct>)=>{
    let productExist = await getProductById(id)
    if(!productExist){
        throw new Error('product not found with given id')
    }
    let [product] = await db.update(products).set(data).returning()
    return product
}

export const deleteProduct = async(id:string)=>{
    let productExist = await getProductById(id);
    if(!productExist){
        throw new Error('product not found with given id')
    }
    let [product] = await db.delete(products).where(eq(products.id,id)).returning()
    return product
}




