import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const NavBar = ({ products }) => {
  const { theme, toggleTheme } = useTheme();
  const { getCartCount } = useCart();

  const cartCount = getCartCount();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [productKeywords, setProductKeywords] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const keywords = new Set();
      products.forEach((product) => {
        product.title
          .toLowerCase()
          .split(" ")
          .forEach((word) => {
            if (word.length > 2) keywords.add(word);
          });
      });
      setProductKeywords([...keywords]);
    }
  }, [products]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => alert(error.message));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchQuery.toLowerCase();
    navigate(`/search/${keyword}`);
    setFilteredSuggestions([]);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchQuery(input);

    if (input.length > 0) {
      const suggestions = productKeywords.filter((keyword) =>
        keyword.startsWith(input)
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (keyword) => {
    setSearchQuery(keyword);
    setFilteredSuggestions([]);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo */}
        <Link className="navbar-brand me-2" to="/">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            className="amazon-logo"
          />
        </Link>

        {/* Search Bar  */}
        <form
          className="search-container d-flex flex-grow-1 mx-2"
          onSubmit={handleSearch}
        >
          <div className="search-wrapper">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleInputChange}
            />
            {filteredSuggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {filteredSuggestions.map((keyword, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(keyword)}
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="btn btn-warning search-btn">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Right-Side Options (Collapses in Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto right-options sign-in">
            {/* Sign In / Sign Out */}
            <li className="nav-item">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="nav-link btn btn-link text-white text-center"
                >
                  <span className="small-text">
                    Hello, {user.email.split("@")[0]}
                  </span>
                  <br />
                  <strong className="small-bold">Sign Out</strong>
                </button>
              ) : (
                <Link to="/login" className="nav-link text-white text-center">
                  <span className="small-text">Hello, User</span>
                  <br />
                  <strong className="small-bold">Sign in</strong>
                </Link>
              )}
            </li>

            {/* Dark Mode Toggle */}
            <li className="nav-item d-flex align-items-center">
              <span className="text-white me-2">Dark Mode</span>
              <label className="theme-switch">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <span className="slider round"></span>
              </label>
            </li>

            {/* Cart Icon */}
            <li className="nav-item cart-container">
              <Link
                to="/cart"
                className="nav-link text-white text-center d-flex align-items-center"
              >
                <i className="bi bi-cart3 fs-4"></i>
                <span className="badge bg-warning ms-1">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
