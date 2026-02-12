// import { useParams } from "react-router-dom";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { createComment, getProductById, type Product } from "../lib/fetch";
// import { useAuth } from "@clerk/clerk-react";
// import { useState } from "react";

// export default function Product() {
//   const { id } = useParams<{ id: string }>();
//   const { isSignedIn } = useAuth();
//   const qc = useQueryClient();
//   const [content, setContent] = useState("");

  // const { data, isLoading, isError, error } = useQuery<Product>({
  //   queryKey: ["product", id],
  //   queryFn: () => getProductById(id!),
  //   enabled: !!id,
  // });

  // const addComment = useMutation({
  //   mutationFn: () => createComment({ productId: id!, content }),
  //   onSuccess: () => {
  //     setContent("");
  //     qc.invalidateQueries({ queryKey: ["product", id] });
  //   },
  // });

  // if (isLoading) {
  //   return <div className="loading loading-lg" />;
  // }
  // if (isError) {
  //   return <div className="alert alert-error">{(error as Error)?.message}</div>;
  // }
  // if (!data) {
  //   return <div className="text-center text-base-content/70">Not found</div>;
  // }

  // return (
    // <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //   <div className="lg:col-span-2">
    //     <img src={data.imageUrl} alt={data.title} className="w-full rounded-xl" />
    //     <h1 className="mt-4 text-2xl font-semibold">{data.title}</h1>
    //     <p className="mt-2">{data.description}</p>
    //   </div>
    //   <div className="lg:col-span-1">
    //     <div className="card bg-base-200">
    //       <div className="card-body">
    //         <h2 className="card-title">Comments</h2>
    //         {data.comments && data.comments.length > 0 ? (
    //           <ul className="space-y-3">
    //             {data.comments.map((c) => (
    //               <li key={c.id} className="p-3 bg-base-300 rounded">
    //                 <div className="text-sm">{c.content}</div>
    //                 <div className="text-xs text-base-content/60">{c.user?.email}</div>
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <div className="text-sm text-base-content/70">No comments yet</div>
    //         )}

    //         {isSignedIn && (
    //           <form
    //             className="mt-4 flex gap-2"
    //             onSubmit={(e) => {
    //               e.preventDefault();
    //               if (!content.trim()) return;
    //               addComment.mutate();
    //             }}
    //           >
    //             <input
    //               className="input input-bordered flex-1"
    //               placeholder="Write a comment"
    //               value={content}
    //               onChange={(e) => setContent(e.target.value)}
    //             />
    //             <button className="btn btn-primary" disabled={addComment.isPending}>
    //               {addComment.isPending ? "Posting..." : "Post"}
    //             </button>
    //           </form>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
//   );
// }
