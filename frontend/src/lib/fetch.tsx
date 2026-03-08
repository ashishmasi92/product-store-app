import api from "./api";
import type { AxiosResponse } from "axios";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type User = {
  id: string;
  fullname: string;
  email: string;
  imageUrl?: string | null;
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
  user?: User;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  user?: User;
  comments?: Comment[];
};

// async function handle<T>(p: Promise<AxiosResponse<ApiResponse<T>>>) {
//   const res = await p;
//   const body = res.data;
//   if (!body.success) {
//     throw new Error(body.message || "Request failed");
//   }
//   return body.data as T;
// }

//  this function wait for the api response and return the data if success or throw an error if not
//  it is used to handle the api response in a consistent way


async function handle<T>(p: Promise<AxiosResponse<ApiResponse<T>>>) {
  const res = await p;
  const b = res.data;
  if (!b.success) {
    throw new Error(b.message || "request failed");
  }

  return b.data as T;
}

// Promise

export async function syncUser(userData: {
  email: string;
  fullname: string;
  imageUrl?: string;
}) {
  return handle<User>(api.post("/user/sync", userData));
}


export async function getAllProducts() {
  return handle<Product[]>(api.get("/product"));
}

export async function getProductById(id: string) {
  return handle<Product>(api.get(`/product/${id}`));
}

export async function getMyProduct() {
  return handle<Product[]>(api.get("/product/my"));
}

export async function createProduct(productData: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return handle<Product>(api.post("/product", productData));
}

export async function updateProduct(input: {
  id: string;
  productData: Partial<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
}) {
  const { id, productData } = input;
  return handle<Product>(api.put(`/product/${id}`, productData));
}

export async function deleteProduct(id: string) {
  return handle<Product>(api.delete(`/product/${id}`));
}

export async function createComment(input: {
  productId: string;
  content: string;
}) {
  const { productId, content } = input;
  return handle<Comment>(api.post(`/comment/${productId}`, { content }));
}

export async function deleteComment(commentId: string) {
  return handle<Comment>(api.delete(`comment/${commentId}`));
}
