import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../lib/fetch";

export const useProducts = () => {
  let result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return result;
};
