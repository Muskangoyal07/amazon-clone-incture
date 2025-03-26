import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully! Redirecting...");
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register container d-flex justify-content-center align-items-center">
      <div className="register__card card p-4 shadow-sm">
        <Link to="/">
          <img
            className="register__logo img-fluid mb-3 mx-auto d-block"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon Logo"
          />
        </Link>

        <h1 className="text-center mb-4">Register</h1>

        <form onSubmit={register}>
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
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Create Account
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "12px" }}>
          By registering, you agree to the{" "}
          <strong>AMAZON FAKE CLONE Conditions of Use & Sale</strong>.
        </p>

        <p className="text-center">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
      />
    </div>
  );
}

export default Register;
