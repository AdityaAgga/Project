import React, { useState } from 'react';
import axios from "axios"

const Register = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password != confirmPassword){
      alert("Passwords does not match");
      return;
    }

    if(!termsAccepted){
      alert("Please Accept terms and conditions");
      return;
    }

    try{
      const userData = {
        email,
        password,
        name
      }

      const response = await axios.post("http://localhost:3000/api/v1/auth/signup",userData)

      alert("Registration Successfull")

      window.location.href = "/sign-in"
    }catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* Register Section */}
      <section className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">Email Address</label>
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
            <label htmlFor="password" className="block text-lg font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-lg font-semibold">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the <a href="#terms" className="text-blue-600">terms and conditions</a>
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="signin.html" className="text-blue-600">Sign In</a>
        </p>
      </section>
    </div>
  );
};

export default Register;