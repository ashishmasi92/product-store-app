import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  getMyProduct,
  updateProduct,
} from "../lib/fetch";

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

export const useProductById = (id: string) => {
  let result = useQuery({
    queryKey: ["getProductBy", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
  return result;
};

export const useDeleteProduct = () => {
  let queryClient = useQueryClient();
  let result = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deleted) => {
      queryClient.invalidateQueries({ queryKey: ["prducts"] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
      if (deleted) {
        queryClient.removeQueries({ queryKey: ["getProductBy", deleted.id] });
      }
    },
  });
  return result;
};

export const useMyProduct = () => {
  let result = useQuery({
    queryKey: ["myProducts"],
    queryFn: getMyProduct,
  });

  return result;
};

export const useUpdateProduct = () => {
  let queryClient = useQueryClient();
  let result = useMutation({
    mutationFn: updateProduct,
     onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
      queryClient.invalidateQueries({
        queryKey: ["getProductBy", variables.id],
      });
    },
  });
  return result;
};
