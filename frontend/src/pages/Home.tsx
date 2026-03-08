import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProduct";
import { SignInButton } from "@clerk/clerk-react";
import { PackageIcon, SparkleIcon } from "lucide-react";
import image from "../assets/image.png";
import ProductCard from "../components/ProductCard";
export default function Home() {
  
  let { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <>
        <div className="hero h-64 lg:h-72  bg-base-300 skeleton mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 skeleton">
              <div className="h-40 bg-base-300" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-base-300" />
                <div className="h-4 w-full bg-base-300" />
                <div className="h-4 w-2/3 bg-base-300" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

 
  return (
    <>
      <div className="space-10">
        {/* Hero */}
        <div className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden">
          <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
              <img
                src={image}
                alt=""
                className="relative h-64 lg:h-72 rouneded-2xl shadow-2xl"
              />
            </div>
            <div className="text-center lg-text-left">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Share Your <span className="text-primary">Products</span>
              </h1>
              <p className="py-4 text-base-content/60">
                Upload, discover, and connect with creators.
              </p>
              <SignInButton mode="modal">
                <button className="btn btn-primary">
                  <SparkleIcon className="size-5" />
                  Start Selling
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>

      {!data ||
        (data.length === 0 && (
          <div className="text-center text-base-content/70">
            No products found
          </div>
        ))}

      {/* products */}

      <div className="mt-2">
        <h2 className="text-xl font-bold flex items-center gap-3 mb-4">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>
      </div>

      {data === undefined || data.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">
              No products found
            </h3>
            <p className="text-base-content/40 text-sm">
              Be the first to share something!
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-2">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 &&
            data.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
        </div>
      )}
    </>
  );
}
