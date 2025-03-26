import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const roundedRating = Math.round(product.rating.rate);

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <Card.Body>
          <Card.Title className="product-title">{product.title}</Card.Title>
          <Card.Text className="product-price">
            ₹{(product.price * 83).toFixed(2)}
          </Card.Text>

          <div className="product-rating">
            {/* Render the stars based on the rounded rating */}
            {[...Array(roundedRating)].map((_, index) => (
              <span key={`filled-${index}`} className="star-rating">
                ⭐
              </span>
            ))}
            {[...Array(5 - roundedRating)].map((_, index) => (
              <span key={`empty-${index}`} className="star-rating">
                ☆
              </span>
            ))}
            <span className="review-count">({product.rating.count})</span>
          </div>

          {/* Amazon-style FREE Delivery text */}
          <p className="free-delivery">FREE Delivery by Amazon</p>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
