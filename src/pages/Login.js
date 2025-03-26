import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login container d-flex justify-content-center align-items-center">
      <div className="login__card card p-4 shadow-sm">
        <Link to="/">
          <img
            className="login__logo img-fluid mb-3 mx-auto d-block"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon Logo"
          />
        </Link>

        <h1 className="text-center mb-4">Sign-in</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            onClick={signIn}
            className="btn btn-warning w-100 mb-3"
          >
            Sign In
          </button>
        </form>

        <p className="text-center" style={{ fontSize: "12px" }}>
          By signing-in you agree to the{" "}
          <strong>AMAZON FAKE CLONE Conditions of Use & Sale</strong>. Please
          see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads
          Notice.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="btn btn-light w-100"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
