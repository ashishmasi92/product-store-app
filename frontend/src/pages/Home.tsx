
// import { useQuery } from "@tanstack/react-query";
// import { getAllProducts, type Product } from "../lib/fetch";
// import { Link } from "react-router-dom";

// export default function Home() {
  // const { data, isLoading, isError, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getAllProducts,
  // });

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="card bg-base-200 animate-pulse">
//             <div className="h-40 bg-base-300" />
//             <div className="p-4 space-y-2">
//               <div className="h-5 w-3/4 bg-base-300" />
//               <div className="h-4 w-full bg-base-300" />
//               <div className="h-4 w-2/3 bg-base-300" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (isError) {
//     return <div className="alert alert-error">{(error as Error)?.message}</div>;
//   }

//   if (!data || data.length === 0) {
//     return <div className="text-center text-base-content/70">No products found</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {data.map((p) => (
//         <div key={p.id} className="card bg-base-200 shadow">
//           <figure className="h-48 overflow-hidden">
//             <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">{p.title}</h2>
//             <p className="line-clamp-3">{p.description}</p>
//             <div className="card-actions justify-end">
//               <Link to={`/product/${p.id}`} className="btn btn-primary btn-sm">
//                 View
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
