import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoriesBar.css";

const CategoriesBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="categories-bar">
      {categories.map((category, index) => (
        <Link
          key={category}
          to={`/category/${category}`}
          className="category-item"
        >
          {category.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesBar;
