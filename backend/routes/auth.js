const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generic user registration (original endpoint kept for backward compatibility)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      userType: 'retailer' // Default to retailer for backward compatibility
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser._id, userType: 'retailer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      success: true, 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: 'retailer'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Registration failed'
    });
  }
});

// Retailer registration endpoint
router.post('/register-retailer', async (req, res) => {
  try {
    const { name, email, password, businessName, address, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new retailer
    const newRetailer = await User.create({
      name,
      email,
      password,
      userType: 'retailer',
      businessName,
      address,
      phone
    });

    // Generate token
    const token = jwt.sign(
      { id: newRetailer._id, userType: 'retailer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      success: true, 
      token,
      user: {
        id: newRetailer._id,
        name: newRetailer.name,
        email: newRetailer.email,
        businessName: newRetailer.businessName,
        userType: 'retailer'
      }
    });
  } catch (error) {
    console.error('Retailer registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Retailer registration failed'
    });
  }
});

// Wholesaler registration endpoint
router.post('/register-wholesaler', async (req, res) => {
  try {
    const { name, email, password, businessName, address, phone, businessType } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new wholesaler
    const newWholesaler = await User.create({
      name,
      email,
      password,
      userType: 'wholesaler',
      businessName,
      address,
      phone,
      businessType
    });

    // Generate token
    const token = jwt.sign(
      { id: newWholesaler._id, userType: 'wholesaler' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      success: true, 
      token,
      user: {
        id: newWholesaler._id,
        name: newWholesaler.name,
        email: newWholesaler.email,
        businessName: newWholesaler.businessName,
        businessType: newWholesaler.businessType,
        userType: 'wholesaler'
      }
    });
  } catch (error) {
    console.error('Wholesaler registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Wholesaler registration failed'
    });
  }
});

// Login endpoint that handles both user types
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        businessName: user.businessName,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Login failed'
    });
  }
});

module.exports = router; 