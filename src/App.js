import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import Register from "./pages/Register";
import CategoriesBar from "./components/CategoriesBar";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import { ThemeProvider } from "./context/ThemeContext";
import "./dark.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products. Please try again later.");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message)); // Set error message
  }, []);

  return (
    <div className="app">
      <ThemeProvider>
        <Navbar products={products} />
        <CategoriesBar />
        {error ? ( // Display error message
          <div className="alert alert-danger text-center" role="alert">
            {error} <br />
            Please try refreshing the page.
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={<CheckoutPage products={products} />}
            />
            <Route
              path="/category/:category"
              element={<CategoryPage products={products} />}
            />
            <Route
              path="/search/:keyword"
              element={<SearchPage products={products} />}
            />
          </Routes>
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
