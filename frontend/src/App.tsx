import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import EditProduct from "./pages/EditProduct";
import useAuthReq from "./hooks/useAuthRe";
import { useQuery } from "@tanstack/react-query";
import useUserSync from "./hooks/useUserSync";

function App() {
  const { isSignedIn, isLoaded } = useAuthReq();
  let { isSynced } = useUserSync();

  console.log(isSynced);
  if (!isLoaded) return null;

  return (
    <>
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/product/:id" element={<h2>HEllow orld</h2>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
