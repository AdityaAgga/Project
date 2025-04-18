import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import UnifiedSignUp from "./components/UnifiedSignUp";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./components/Pricing";
import Mainpage from "./components/MainPage";
import ProductManagement from "./components/ProductManagement";
import OrderTracking from "./components/OrderTracking";
import InventoryUpdates from "./components/InventoryUpdates";
import Analytics from "./components/Analytics";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import ProductCatalog from "./pages/retailer/ProductCatalog";
import Messages from "./pages/retailer/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/register" element={<UnifiedSignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<Mainpage />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/inventory-updates" element={<InventoryUpdates />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
              <Route path="/retailer/products" element={<ProductCatalog />} />
              <Route path="/retailer/messages" element={<Messages />} />
            </Route>
            <Route path="/retailer/sign-in" element={<SignIn />} />
            <Route path="/retailer/register" element={<UnifiedSignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;