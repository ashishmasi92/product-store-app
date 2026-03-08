import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  useProductById,
  useProducts,
  useUpdateProduct,
} from "../hooks/useProduct";
import EditProductForm from "../components/EditProductForm";

export default function EditProduct() {
  let { id } = useParams();
  let { userId } = useAuth();
  let navigate = useNavigate();
  let { data: product, isLoading } = useProductById(id as string);

  let updateProduct = useUpdateProduct();

  if (isLoading) {
    return (
      <div className="flex items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {product
              ? "You are not authorized to edit this product"
              : "Product not found"}
            <Link className="btn btn-primary btn-sm" to="/">
              Go Home
            </Link>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EditProductForm
        isError={updateProduct.isError}
        isPending={updateProduct.isPending}
        product={product}
        onSubmit={(formdata) => {
          updateProduct.mutate(
            { id: id as string, productData: formdata },
            {
              onSuccess: () => {
                navigate(`/product/${id}`);
              },
            },
          );
        }}
      />
    </div>
  );
}
