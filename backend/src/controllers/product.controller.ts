import { type NewProduct, products, users } from "../model/schema";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";
import customResponse from "../utils/customResponse";
import * as productQueries from "../model/queries";
import { getAuth } from "@clerk/express";

//  public
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let products = await productQueries.getAllProducts();

    if (!products) {
      return customResponse(res, 404, false, "no products found");
    }

    return customResponse(res, 200, true, "all products", products);
  } catch (error) {
    console.log("error while get all products", error);
    return customResponse(res, 500, false, "internal error");
  }
};

//  get Product by current user (protected)

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    let { userId } = getAuth(req);

    if (!userId) {
      return customResponse(res, 401, false, "unauthorized");
    }

    let myProducts = await productQueries.getAllProductsByUserId(userId);

    if (!myProducts) {
      return customResponse(res, 404, false, "no products found");
    }
    if(myProducts.length === 0){
      return customResponse(res, 404, false, "no products found");
    }

    return customResponse(res, 200, true, "my products", myProducts);
  } catch (error) {
    console.log("error while get my products", error);
    return customResponse(res, 500, false, "internal error");
  }
};

// get single product by id (public)

export const getProductById = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    if (!id) {
      return customResponse(res, 400, false, "id not found");
    }

    let product = await productQueries.getProductById(id);

    if (!product) {
      return customResponse(res, 401, false, "invalid user");
    }

    return customResponse(res, 200, true, "product ", product);
  } catch (error) {
    console.log("error while get product by id", error);
    return customResponse(res, 500, false, "internal error");
  }
};

// create product (protected)
export const createProduct = async (req: Request, res: Response) => {
  try {
    let { userId } = getAuth(req);

    if (!userId) {
      return customResponse(res, 401, false, "unauthorized");
    }
    const data: NewProduct = req.body;
    const product = await productQueries.createProduct(data);

    if (!product) {
      return customResponse(res, 400, false, "something went wrong");
    }

    return customResponse(res, 201, true, "created product success", product);
  } catch (e) {
    console.log("error while product create", e);
    return customResponse(res, 500, false, "internal error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
try {
    let { userId } = getAuth(req);
  
    if (!userId) {
      return customResponse(res, 401, false, "unauthorized");
    }
    let id = req.params.id;
    let data = req.body;
  
    let userProduct = await productQueries.getProductById(id as string);
  
    if (!userProduct) {
      return customResponse(res, 404, false, "product not found with given id");
    }
  
    if (userProduct.userId !== userId) {
      return customResponse(
        res,
        403,
        false,
        "you are not authorized to update this product",
      );
    }
  
    let updatedProduct = await productQueries.updateProduct(id as string,{...data})
    
    if(!updatedProduct){
      return customResponse(res,400,false,"something went wrong")
    }
  
  return customResponse(res,200,true,"updated product success",updatedProduct)
} catch (error) {
  console.log("error while update product",error)
  return customResponse(res,500,false,"internal error")
}
};


export const deleteProduct = async (req:Request,res:Response)=>{
  try {
    let { userId } = getAuth(req);

    if(!userId){
      return customResponse(res,401,false,"unauthorized")
    }
let id = req.params.id;

let userProduct = await productQueries.getProductById(id as string)

if(!userProduct){
  return customResponse(res,404,false,"product not found with given id")
}

if(userProduct.userId !== userId){
  return customResponse(res,403,false,"you are not authorized to delete this product")
}

let deletedProduct = await productQueries.deleteProduct(id as string)

if(!deletedProduct){
  return customResponse(res,400,false,"something went wrong")
}

return customResponse(res,200,true,"deleted product success",deletedProduct)



}catch(error){
  console.log("error while delete product",error)
  return customResponse(res,500,false,"internal error")
}
}














// export  async function createProduct(req:Request,res:Response){

//     try {
//         const  data:NewProduct = req.body;
//         const  [product] =await  db.insert(products).values(data).returning()

//         if(!product){
//             return  customResponse(res,400,false,"something went wrong")
//         }

//         return  customResponse(res,201,true,"created product success",product)

//     }catch (e) {
//         console.log("error while product create",e)
//         return customResponse(res,500,false,"internal error")
//     }

// }

// export async function getAllProduct(req:Request,res:Response){

//     const allProducts = await db.query.products.findMany({
//         with: { user: true },
//         orderBy: (products, { desc }) => [desc(products.created_at)],
//     });

//     return customResponse(res,200,true,"all product",allProducts)
// }

// export  async function getProductById(req:Request,res:Response){
//     try {

//         let id = Number(req.params.id);

//         if(!id ){
//             return customResponse(res,404,false,"id must be provided")
//         }

//         if(Number.isNaN(id)){
//             return customResponse(res,404,false,"invalid id")
//         }
//         let product = await  db.query.products.findFirst(
//             {
//                 where:eq(products.id,id),
//                 with:{user:true,
//                     comments:{
//                         user:true,
//                         orderBy:(comments,{desc})=> [desc(comments.created_at)]
//                     }
//                 },

//             }
//         )

//         return  customResponse(res,200,true,"get product",product)

//     }catch (e) {
//         console.log("error occur",e)
//         return customResponse(res,500,false,"internal error")
//     }
// }

// export  async function getProductByUserId(req:Request,res:Response){

//     let userId = req.query.id;

//     if(!userId){
//         return customResponse(res,401,false,"unauthorized")
//     }

//     let [product] = await db.query.products.findMany(
//         {
//             with: {user: true},
//             orderBy: (products, {desc}) => [desc(products.created_at)]
//         })
//     return customResponse(res,200,true,"all prouct By user",product)

// }

// export  async function updateProduct(req:Request,res:Response){
//     try {

//         const productId = Number(req.params.id);
//         const userId = Number(req.user?.id) // assuming auth middleware
//         const data:Partial<NewProduct> = req.body;

//         if(Number.isNaN(productId)){
//             return customResponse(res,400,false,"invalid user id")
//         }

// // check user exists

//         let user = await db.query.users.findFirst({
//             where : eq(users.id,userId)
//         })

//         if(!user){
//             return customResponse(res,401,false,"unauthorized")
//         }

//         const product = await db.query.products.findFirst({
//             where:eq(products.id,productId)
//         })

//         if(product){
//             return customResponse(res,400,false,"product not found")
//         }
//         // Ownership check
//         if(product.user_id !== userId){
//             return  customResponse(res,403,false,"forbidden")
//         }

//         let [updateProduct] = await  db.update(products).set(
//             {...data,updatedAt:new Date()}
//         ).where(eq(products.id,productId)).returning();

//         return  customResponse(res,200,true,"update successfully",updateProduct)
//     }catch (e) {
//         console.log("error update product",e)
//         return customResponse(res,500,false,"internal error")
//     }

// }

// export  async function deleteProduct(req:Request,res:Response){

// }
