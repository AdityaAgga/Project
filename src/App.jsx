import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { createTheme } from '@mui/material/styles';
import theme from './theme';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
});
import Home from './pages/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import WholesalerDashboard from './pages/wholesaler/WholesalerDashboard';
import Products from './pages/retailer/Products';
import WholesalerProducts from './pages/wholesaler/Products';
import Orders from './pages/retailer/Orders';
import WholesalerOrders from './pages/wholesaler/Orders';
import Messages from './pages/retailer/Messages';
import WholesalerMessages from './pages/wholesaler/Messages';
import ProductDetails from './pages/retailer/ProductDetails';
import Profile from './pages/Profile';
import Analytics from './pages/wholesaler/Analytics';
import Reviews from './pages/Reviews';
import Bidding from './pages/Bidding';
import Header from './components/Header';
import { useTheme } from '@mui/material/styles';
import Footer from './components/Footer';
import About from './components/About';
import HowItWorksBrief from './components/HowItWorksBrief';
import Mainpage from './components/MainPage';
import ProductManagement from './components/ProductManagement';
import OrderTracking from './pages/OrderTracking';
import InventoryUpdates from './components/InventoryUpdates';
import OtpVerification from './components/OtpVerification';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Update theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const currentTheme = useMemo(() => (isDarkMode ? darkTheme : theme), [isDarkMode]);

  return (
    <ThemeProvider theme={currentTheme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header theme={currentTheme} toggleTheme={toggleTheme} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorksBrief />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/verify-otp" element={<OtpVerification />} />
                 <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Mainpage />
                    </ProtectedRoute>
                  } />
                <Route path="/retailer/dashboard" element={
                    <ProtectedRoute allowedRoles={['retailer']}>
                      <RetailerDashboard />
                    </ProtectedRoute>
                  } />
                <Route path="/wholesaler/dashboard" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <WholesalerDashboard />
                    </ProtectedRoute>
                  } />
                <Route path="/retailer/orders" element={
                    <ProtectedRoute allowedRoles={['retailer']}>
                      <Orders />
                    </ProtectedRoute>
                  } />
                <Route path="/retailer/products" element={
                    <ProtectedRoute allowedRoles={['retailer']}>
                      <Products />
                    </ProtectedRoute>
                  } />
                <Route path="/retailer/products/:productId" element={
                    <ProtectedRoute allowedRoles={['retailer']}>
                      <ProductDetails />
                    </ProtectedRoute>
                  } />
                <Route path="/retailer/messages" element={
                    <ProtectedRoute allowedRoles={['retailer']}>
                      <Messages />
                    </ProtectedRoute>
                  } />
                <Route path="/wholesaler/orders" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <WholesalerOrders />
                    </ProtectedRoute>
                  } />
                <Route path="/wholesaler/products" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <WholesalerProducts />
                    </ProtectedRoute>
                  } />
                <Route path="/wholesaler/messages" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <WholesalerMessages />
                    </ProtectedRoute>
                  } />
                <Route path="/reviews" element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  } />
                <Route path="/bidding" element={
                    <ProtectedRoute>
                      <Bidding />
                    </ProtectedRoute>
                  } />
                <Route path="/product-management" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <ProductManagement />
                    </ProtectedRoute>
                  } />
                <Route path="/order-tracking" element={
                    <ProtectedRoute>
                      <OrderTracking />
                    </ProtectedRoute>
                  } />
                <Route path="/inventory-updates" element={
                    <ProtectedRoute>
                      <InventoryUpdates />
                    </ProtectedRoute>
                  } />
                <Route path="/analytics" element={
                    <ProtectedRoute allowedRoles={['wholesaler']}>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;