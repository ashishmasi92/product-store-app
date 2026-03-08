import type { Product } from "../lib/fetch";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
type Props = {
  product: Product;
};

type EditProductFormData = Props & {
  isPending: boolean;
  isError: boolean;
  onSubmit: (formData: ProductFormData) => void;
};

type ProductFormData = {
  title: string;
  description: string;
  imageUrl: string;
};

export default function EditProductForm({
  product,
  isError,
  isPending,
  onSubmit,
}: EditProductFormData) {
  let [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });
  let [imageLoadFailed, setImageLoadFailed] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "imageUrl") {
      setImageLoadFailed(false);
    }
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  return (
    <div className="max-w-lg mx-auto">
      <Link className="btn btn-ghost btn-sm gap-1 mb-3  " to="/">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-4 text-primary" />
            Edit Product
          </h1>

          {/*form */}
          <form onSubmit={handleSubmit}>
            <label className="input inpit-bordered flex items-center gap-2 bg-base-300">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                className="grow"
                name="title"
                placeholder="product title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label className="input inpit-bordered flex items-center gap-2 bg-base-300 mt-2">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                className="grow"
                name="imageUrl"
                placeholder="Image URl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </label>
            {formData && !imageLoadFailed && (
              <div className="rounded-box overflow-hidden mt-2">
                <img
                  src={formData.imageUrl}
                  className="w-full h-50 object-cover"
                  alt="preview"
                  onError={(e) => {
                    setImageLoadFailed(true);
                  }}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-300 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />

                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  required
                />
              </div>
            </div>
            {isError && (
              <div role="alert" className="alert alert-error alert-sm ">
                <span>Failed to update </span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
