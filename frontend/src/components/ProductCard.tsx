import { Link } from "react-router-dom";
import type { Product } from "../lib/fetch";
import { MessageCircleIcon } from "lucide-react";

type Props = {
  product: Product;
};

let OneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export default function ProductCard({ product }: Props) {
  let isNew = new Date(product.createdAt) > OneWeekAgo;

  return (
    <Link
      className="card bg-base-300 hover:bg-base-200 transition-colors"
      to={`/product/${product.id}`}
    >
      <figure className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-xl h-40 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-base ">
          {product.title}
          {isNew && (
            <span className="badge badge-sm badge-primary ml-2">New</span>
          )}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        <div className="divider my-1"></div>

        <div className="flex items-center justify-between">
          {product.user && (
            <div className="avatar space-x-2">
              <div className="w-6 rounded-full ring-1 ring-primary">
                <img src={product.user.imageUrl!} alt={product.user.fullname} />
              </div>
              <span className="text-sm text-base-content/60">
                {product.user.fullname}
              </span>
            </div>
          )}

          {product.comment && (
            <div className="flex items-center gap-1 text-base-content/50">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="text-sm">{product.comment.length}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
