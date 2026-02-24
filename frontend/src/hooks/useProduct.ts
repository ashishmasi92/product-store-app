import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts, createProduct } from "../lib/fetch";

export const useProducts = () => {
  let result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return result;
};

export const useCreateProduct = () => {
  let result = useMutation({
    mutationFn: createProduct,
  });

  return result;
};
