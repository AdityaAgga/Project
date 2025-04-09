import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const SignIn = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const userData = {
        email: formData.email,
        password: formData.password
      }

      const response = await axios.post("http://localhost:3000/api/v1/auth/login",userData)

      const { token } = response.data; 
      alert("Sign In successful!");
      console.log("JWT Token:", token);

      localStorage.setItem("authToken", token);

      window.location.href = "/dashboard"
    }catch (error) {
      console.error("Error during sign-in:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Invalid credentials"}`);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Sign in to your retailer account to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="submit-btn">Sign In</button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
