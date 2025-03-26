import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="amazon-footer">
      {/* Back to Top */}
      <div className="back-to-top">
        <a href="#top" className="back-to-top-link">
          <div className="back-to-top-content">Back to Top</div>
        </a>
      </div>

      {/* Links Section */}
      <Container className="footer-links">
        <Row>
          <Col xs={6} md={3}>
            <h6 className="footer-heading">Get to Know Us</h6>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Science</li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h6 className="footer-heading">Connect with Us</h6>
            <ul className="footer-list">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h6 className="footer-heading">Make Money with Us</h6>
            <ul className="footer-list">
              <li>Sell on Amazon</li>
              <li>Affiliate Marketing</li>
              <li>Advertise Your Products</li>
              <li>Amazon Pay</li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h6 className="footer-heading">Let Us Help You</h6>
            <ul className="footer-list">
              <li>Help Center</li>
              <li>Shipping & Returns</li>
              <li>Account Settings</li>
              <li>Track Your Order</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Amazon Logo & Disclaimer */}
      <div className="footer-logo text-center">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
          className="amazon-logo1"
        />
        <p className="footer-disclaimer">
          &copy; 2025 | This is a simulation for learning purposes and is not
          affiliated with Amazon.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
