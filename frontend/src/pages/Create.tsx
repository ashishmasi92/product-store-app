import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useCreateProduct } from "../hooks/useProduct";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparkleIcon,
  TypeIcon,
} from "lucide-react";

export default function Create() {
  const { isSignedIn } = useAuth();
  const nav = useNavigate();
  let result = useCreateProduct();
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  if (!isSignedIn) {
    return (
      <div className="alert alert-warning">Sign in to create a product</div>
    );
  }

  let handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  let handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    result.mutate(formData, {
      onSuccess: () => {
        nav("/");
      },
    }); // formData is not expected by the mutationFn
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparkleIcon className="size-4" />
            New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            {/* TITLE INPUT */}
            <label
              className="input input-bordered flex items-center
             gap-2 bg-base-200 "
            >
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="product title"
                className="grow"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>

            {/* Image URl */}
            <label
              className="input input-bordered flex items-center
             gap-2 bg-base-200 "
            >
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="image"
                className="grow"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  src={formData.imageUrl}
                  className="w-full h--40 object-cover"
                  alt="preview"
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  name="description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  onChange={handleChange}
                  value={formData.description}
                  required
                />
              </div>
            </div>

            {result.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={result.isPending}
            >
              {result.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
