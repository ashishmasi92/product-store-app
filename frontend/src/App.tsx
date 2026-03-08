import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import EditProduct from "./pages/EditProduct";
import useAuthReq from "./hooks/useAuthRe";
import useUserSync from "./hooks/useUserSync";
import Product from "./pages/Product";

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
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/profile"
              element={isSignedIn ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={isSignedIn ? <Create /> : <Navigate to="/" />}
            />
            <Route
              path="/edit/:id"
              element={isSignedIn ? <EditProduct /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
