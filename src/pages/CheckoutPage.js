import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="container checkout-page mt-4">
      {orderSuccess ? (
        <div className="alert alert-success text-center" role="alert">
          ✅ Order Placed Successfully! Redirecting to home...
        </div>
      ) : (
        <div className="row">
          {/* Left Section - Checkout Form */}
          <div className="col-md-7 checkout-left p-4 bg-white rounded shadow-sm">
            <h4 className="checkout-section-title mb-3">Shipping Address</h4>
            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows="3" required></textarea>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Postal Code</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select className="form-select">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>PayPal</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 mt-3 fw-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Right Section - Order Summary */}
          <div className="col-md-4 checkout-right p-4 bg-white rounded shadow-sm">
            <h4 className="checkout-section-title">Order Summary</h4>
            <div className="order-summary">
              <p className="order-items">
                Total Items: <strong>{cart.length}</strong>
              </p>
              <p className="order-total">
                Total Price: <strong>₹{getCartTotal().toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
