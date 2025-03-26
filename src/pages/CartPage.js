import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, getCartCount, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="cart-heading">Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <h2 className="cart-heading">Your Shopping Cart</h2>

      <div className="cart-container">
        {/* Left Section - Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item">Price: ₹{item.price}</p>
                <p className="cart-item">Quantity: {item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - Summary */}
        <div className="cart-summary">
          <p>
            Total Items: <strong>{getCartCount()}</strong>
          </p>
          <p>
            Total Price: <strong>₹{getCartTotal().toFixed(2)}</strong>
          </p>
          <button
            className="proceed-to-checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
