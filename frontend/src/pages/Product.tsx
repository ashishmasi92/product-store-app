import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useProductById } from "../hooks/useProduct";
import { useAuth } from "@clerk/clerk-react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import CommentSection from "../components/CommentSection";

export default function Product() {
  let { id } = useParams();
  let { userId } = useAuth();
  let navigate = useNavigate();
  let { data: product, error, isLoading } = useProductById(id ?? "");
  let deleteProduct = useDeleteProduct();

  let deleteHandle = () => {
    if (confirm("Are your sure you want to delete this product permanently ?"))
      deleteProduct.mutate(id!, {
        onSuccess: () => {
          navigate("/");
        },
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product Not Found</h2>
          <Link to="/" className=" btn btn-primary btn-sm">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId;

  return (
    <>
      <div className="max-w-4xl  mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="btn btn-primary btn-sm">
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${product.id}`}
                className="btn btn-ghost btn-sm gap-1"
              >
                <EditIcon className="size-4" /> Edit
              </Link>

              <button
                onClick={deleteHandle}
                className="btn btn-error btn-sm gap-1"
                disabled={deleteProduct.isPending}
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* image */}
          <div className="card bg-base-300">
            <figure className="p-3">
              <img
                src={product.imageUrl}
                alt={product.title}
                className=" rounded-xl w-full h-80 object-cover"
              />
            </figure>
          </div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title font-sans text-sm">{product.title}</h1>

              <div className="flex flex-wrap gap-4 text-[12px] text-base-content/60">
                <div className="flex items-center ">
                  <CalendarIcon className="size-3" />
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="size-4" />
                  {product.user?.fullname}
                </div>
              </div>

              <div className="divider my-1"></div>
              <p className="text-base-content/80 leading-relaxed text-sm">
                {product.description}
              </p>

              {product.user && (
                <>
                  <div className="divider my-2"></div>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={product.user?.imageUrl! ?? ""}
                          alt={product.user?.fullname ?? "user"}
                        />
                      </div>
                    </div>
                    <div className="">
                      <p className="font-semibold">{product.user.fullname}</p>
                      <p className="text-sm text-base-content/50">Creator</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* comment Section */}
        <div className="  card bg-base-300">
          <div className="card-body ">
            <CommentSection
              currentUser={userId!}
              productId={id!}
              comments={product.comments}
            />
          </div>
        </div>
      </div>
    </>
  );
}
