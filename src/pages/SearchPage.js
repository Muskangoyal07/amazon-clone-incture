import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./SearchPage.css";

const SearchPage = ({ products }) => {
  const { keyword } = useParams();
  const lowerKeyword = keyword.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(lowerKeyword)
  );

  return (
    <div className="search-result-page">
      <h2>Search Results for "{keyword}"</h2>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-results">No products found for "{keyword}"</p>
      )}
    </div>
  );
};

export default SearchPage;
