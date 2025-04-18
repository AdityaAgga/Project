import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation, Link } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  const [userType, setUserType] = useState('retailer');
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Get user type from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'wholesaler' || type === 'retailer') {
      setUserType(type);
    }
  }, [location.search]);

  // Toggle between user types
  const toggleUserType = (type) => {
    setUserType(type);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept terms and conditions");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        businessName,
        address,
        phone
      };
      
      // Add business type for wholesalers
      if (userType === 'wholesaler') {
        userData.businessType = businessType;
      }

      // Use different endpoints based on user type
      const endpoint = userType === 'retailer' 
        ? "http://localhost:5000/api/v1/auth/register-retailer"
        : "http://localhost:5000/api/v1/auth/register-wholesaler";

      const response = await axios.post(endpoint, userData);

      alert("Registration Successful");
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="font-sans bg-gray-100 py-10">
      <section className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-4">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">Join our platform and start growing your business</p>
        
        {/* User Type Selector */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button 
            className={`flex-1 py-3 font-semibold ${userType === 'retailer' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => toggleUserType('retailer')}
          >
            Retailer
          </button>
          <button 
            className={`flex-1 py-3 font-semibold ${userType === 'wholesaler' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            onClick={() => toggleUserType('wholesaler')}
          >
            Wholesaler
          </button>
        </div>
        
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
            <label htmlFor="businessName" className="block text-lg font-semibold">
              {userType === 'retailer' ? 'Store Name' : 'Business Name'}
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder={userType === 'retailer' ? 'Enter your store name' : 'Enter your business name'}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-semibold">Business Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Enter your business address"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-semibold">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          {userType === 'wholesaler' && (
            <div className="mb-4">
              <label htmlFor="businessType" className="block text-lg font-semibold">Business Type</label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full p-3 border rounded-lg mt-2"
                placeholder="e.g., Manufacturer, Distributor, etc."
                required
              />
            </div>
          )}
          
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
          
          <button 
            type="submit" 
            className={`w-full ${userType === 'retailer' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-500'} text-white py-3 rounded-lg font-semibold`}
          >
            Register as {userType === 'retailer' ? 'Retailer' : 'Wholesaler'}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already have an account? <Link to="/sign-in" className="text-blue-600">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;