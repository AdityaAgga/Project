const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const createToken = (userId, userType) => {
    return jwt.sign({ userId, userType }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Generic User Registration Controller (kept for backward compatibility)
exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists with this email",
            });
        }

        // Create new user (defaults to retailer type)
        const user = await User.create({ 
            email, 
            password, 
            name,
            userType: 'retailer'
        });

        // Generate token
        const token = createToken(user._id, 'retailer');

        return res.status(201).json({
            status: "success",
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: 'retailer'
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: err.message || "Registration failed",
        });
    }
};

// Retailer Registration Controller
exports.registerRetailer = async (req, res, next) => {
    try {
        const { name, email, password, businessName, address, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists with this email",
            });
        }

        // Create new retailer
        const retailer = await User.create({
            name,
            email,
            password,
            userType: 'retailer',
            businessName,
            address,
            phone
        });

        // Generate token
        const token = createToken(retailer._id, 'retailer');

        return res.status(201).json({
            status: "success",
            message: "Retailer registration successful",
            token,
            user: {
                id: retailer._id,
                name: retailer.name,
                email: retailer.email,
                businessName: retailer.businessName,
                userType: 'retailer'
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: err.message || "Retailer registration failed",
        });
    }
};

// Wholesaler Registration Controller
exports.registerWholesaler = async (req, res, next) => {
    try {
        const { name, email, password, businessName, address, phone, businessType } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists with this email",
            });
        }

        // Create new wholesaler
        const wholesaler = await User.create({
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
        const token = createToken(wholesaler._id, 'wholesaler');

        return res.status(201).json({
            status: "success",
            message: "Wholesaler registration successful",
            token,
            user: {
                id: wholesaler._id,
                name: wholesaler.name,
                email: wholesaler.email,
                businessName: wholesaler.businessName,
                businessType: wholesaler.businessType,
                userType: 'wholesaler'
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: err.message || "Wholesaler registration failed",
        });
    }
};

// Login Controller (handles both user types)
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: "error",
                message: "Invalid password",
            });
        }

        // Generate token
        const token = createToken(user._id, user.userType);

        return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                businessName: user.businessName,
                userType: user.userType
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};