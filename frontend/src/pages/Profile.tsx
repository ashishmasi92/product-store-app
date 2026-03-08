import { useDeleteProduct, useMyProduct } from "../hooks/useProduct";
import { Link, useNavigate } from "react-router-dom";
import {
  PackageIcon,
  EyeIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";

export default function Profile() {
  let navigate = useNavigate();
  let { data: products, isLoading } = useMyProduct();
  let deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product"))
      deleteProduct.mutate(id);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex  items-center mt-10">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">My Products</h1>
            <p className="text-base-content/60 text-sm">
              {" "}
              Manage Your Listings
            </p>
          </div>
          <Link to="/create" className="btn btn-primary btn-sm gap-1">
            <PackageIcon className="size-4" /> New
          </Link>
        </div>

        {/* stats */}

        <div className="stat bg-base-300 w-full">
          <div className="stat ">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">
              {products?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* products */}

      {products?.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No Products Yet</h3>
            <p className="text-base-content/40 text-sm">
              Start by creating your first product
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products &&
            products.map((product) => {
              return (
                <>
                  <div
                    className="card card-side my-5 bg-base-300 "
                    key={product.id}
                  >
                    <figure className="w-32 shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="object-cover h-full"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-base ">{product.title}</h2>
                      <p className="text-base-content/50 text-sm line-clamp-1">
                        {product.description}
                      </p>
                      <div className="card-actions justify-end mt-2">
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="btn btn-ghost btn-xs gap-1"
                        >
                          <EyeIcon className="size-3" /> View
                        </button>
                        <button
                          onClick={() => navigate(`/edit/${product.id}`)}
                          className="btn btn-ghost btn-xs gap-1"
                        >
                          <EditIcon className="size-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-ghost btn-xs text-error gap-1"
                          disabled={deleteProduct.isPending}
                        >
                          <Trash2Icon className="size-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </>
  );
}
