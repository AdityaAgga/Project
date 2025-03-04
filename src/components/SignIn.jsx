import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const userData = {
        email,
        password
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
    <div className="font-sans bg-gray-100">
      {/* SignIn Section */}
      <section className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
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
          <div className="mb-4">
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
