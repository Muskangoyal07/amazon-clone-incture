import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";
import { Spinner } from "react-bootstrap";

const CategoryPage = ({ products = [] }) => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ price: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!Array.isArray(products) || products.length === 0) {
      setFilteredProducts([]);
      setIsLoading(false);
      return;
    }

    let filtered = products.filter((product) => product.category === category);

    if (filters.price) {
      const maxPriceINR = parseFloat(filters.price);
      const maxPriceUSD = maxPriceINR / 83;

      if (!isNaN(maxPriceUSD)) {
        filtered = filtered.filter(
          (item) => parseFloat(item.price) <= maxPriceUSD
        );
      }
    }
    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [category, filters.price, products]);
  return (
    <div className="category-page">
      {/* Left Sidebar - Filters */}
      <div className="filters">
        <h3>Filters</h3>

        {/* Price Filter */}
        <div className="filter-section">
          <h4>Price</h4>
          <input
            type="number"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            placeholder="Enter max price"
          />
        </div>

        <div className="filter-section">
          <h4>Amazon Prime</h4>
          <label>
            <input type="checkbox" /> Prime Eligible
          </label>
        </div>

        <div className="filter-section">
          <h4>Delivery Day</h4>
          <label>
            <input type="radio" name="delivery" /> Get It Today
          </label>
          <label>
            <input type="radio" name="delivery" /> Get It by Tomorrow
          </label>
        </div>

        <div className="filter-section">
          <h4>Customer Reviews</h4>
          <label>
            <input type="checkbox" /> ⭐⭐⭐⭐ & Up
          </label>
          <label>
            <input type="checkbox" /> ⭐⭐⭐ & Up
          </label>
        </div>

        <div className="filter-section">
          <h4>Item Condition</h4>
          <label>
            <input type="radio" name="condition" /> New
          </label>
          <label>
            <input type="radio" name="condition" /> Renewed
          </label>
        </div>

        <div className="filter-section">
          <h4>Deals & Discounts</h4>
          <label>
            <input type="checkbox" /> 10% Off or More
          </label>
          <label>
            <input type="checkbox" /> 25% Off or More
          </label>
          <label>
            <input type="checkbox" /> 50% Off or More
          </label>
        </div>

        <div className="filter-section">
          <h4>Seller</h4>
          <label>
            <input type="checkbox" /> Clicktech Retail
          </label>
          <label>
            <input type="checkbox" /> Cocoblu Retail
          </label>
        </div>

        <div className="filter-section">
          <h4>Availability</h4>
          <label>
            <input type="checkbox" /> Include Out of Stock
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="category-main">
        <div className="category-banner">
          <img
            src="https://m.media-amazon.com/images/G/31/highvelocityevents/og_image/primeday._CB633113658_.png"
            alt={`${category} Banner`}
            className="banner-img"
          />
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found in this range.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
