import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../lib/fetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function Create() {
  const { isSignedIn } = useAuth();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const create = useMutation({
    mutationFn: () => createProduct({ title, description, imageUrl }),
    onSuccess: (p) => {
      nav(`/product/${p.id}`);
    },
  });

  if (!isSignedIn) {
    return <div className="alert alert-warning">Sign in to create a product</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !description.trim() || !imageUrl.trim()) return;
          create.mutate();
        }}
      >
        <input
          className="input input-bordered w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="btn btn-primary" disabled={create.isPending}>
          {create.isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
