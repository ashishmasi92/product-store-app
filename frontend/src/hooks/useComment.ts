import { createComment, deleteComment } from "../lib/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  let queryClient = useQueryClient();
  let result = useMutation({
    mutationFn: createComment,
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({queryKey:["getProductBy",variable.productId]});
    },
  });
  return result;
};


export const useDeleteComment = (productId: string) => {
     let queryClient = useQueryClient();
  let result = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:["getProductBy",productId]})
    }
  });
  return result;
};
