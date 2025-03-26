import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) =>
          setRelatedProducts(data.filter((item) => item.id !== product.id))
        )
        .catch((error) =>
          console.error("Error fetching related products:", error)
        );
    }
  }, [product]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) {
    return <p className="error-message">Product not found.</p>;
  }

  const stockAvailable =
    product.rating.count > 10 ? "In Stock" : "Limited Stock";

  return (
    <Container className="product-detail-1">
      <Row>
        <Col md={6} className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image-1"
          />
        </Col>
        <Col md={6} className="product-details">
          <h2>{product.title}</h2>
          <p className="category-badge">{product.category}</p>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ₹{(product.price * 83).toFixed(2)}
          </p>
          <p className="stock-label">{stockAvailable}</p>
          <p>
            <strong>Rating:</strong> ⭐ {product.rating.rate} (
            {product.rating.count} reviews)
          </p>
          <Button variant="warning" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="related-products">
        <h3>Related Products</h3>
        <div className="related-products-grid">
          {relatedProducts.map((item) => (
            <div key={item.id} className="related-product-card">
              <img
                src={item.image}
                alt={item.title}
                className="related-product-image"
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default ProductDetail;
