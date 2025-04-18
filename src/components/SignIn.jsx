import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignIn = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("retailer");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = {
        email,
        password,
        userType
      };

      const response = await axios.post("http://localhost:5000/api/v1/auth/login", userData);

      const { token, user } = response.data; 
      
      // Store token and user type in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userType", user.userType);
      localStorage.setItem("userName", user.name);
      
      alert("Sign In successful!");

      // Redirect based on user type
      if (user.userType === "retailer") {
        window.location.href = "/retailer/dashboard";
      } else {
        window.location.href = "/wholesaler/dashboard";
      }
    } catch (error) {
      console.error("Error during sign-in:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Invalid credentials"}`);
    }
  };

  return (
    <div className="font-sans bg-gray-100 py-10">
      <section className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-4">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back to our platform</p>
        
        {/* User Type Selector */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button 
            className={`flex-1 py-3 font-semibold ${userType === 'retailer' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setUserType('retailer')}
            type="button"
          >
            Retailer
          </button>
          <button 
            className={`flex-1 py-3 font-semibold ${userType === 'wholesaler' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setUserType('wholesaler')}
            type="button"
          >
            Wholesaler
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${userType === 'retailer' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-500'} text-white py-3 rounded-lg font-semibold`}
          >
            Sign In as {userType === 'retailer' ? 'Retailer' : 'Wholesaler'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to={`/register?type=${userType}`} className="text-blue-600">
            Register as {userType === 'retailer' ? 'Retailer' : 'Wholesaler'}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
