import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
  return (
    <Container fluid className="product-grid">
      <h2 className="featured-title">Top Products 🔥</h2>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={2} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
