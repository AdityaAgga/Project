const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { sendOtpEmail } = require("../utils/email");

const createToken = (userId, userType) => {
    return jwt.sign({ userId, userType }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Helper to generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

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

        // Generate OTP
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create new user (defaults to retailer type)
        const user = await User.create({ 
            email, 
            password, 
            name,
            userType: 'retailer',
            otp,
            otpExpiry,
            isVerified: false
        });

        // Send OTP email
        await sendOtpEmail(email, otp);

        return res.status(201).json({
            status: "success",
            message: "Registration successful. Please verify your email with the OTP sent.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: 'retailer',
                isVerified: false
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

        // Check if email or phone is already registered for any userType
        const existingUser = await User.findOne({ $or: [ { email }, { phone } ] });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "This email or phone number is already registered. You cannot register as both retailer and wholesaler with the same email or phone.",
            });
        }

        // Generate OTP
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create new retailer
        const retailer = await User.create({
            name,
            email,
            password,
            userType: 'retailer',
            businessName,
            address,
            phone,
            otp,
            otpExpiry,
            isVerified: false
        });

        // Send OTP email
        await sendOtpEmail(email, otp);

        return res.status(201).json({
            status: "success",
            message: "Retailer registration successful. Please verify your email with the OTP sent.",
            user: {
                id: retailer._id,
                name: retailer.name,
                email: retailer.email,
                businessName: retailer.businessName,
                userType: 'retailer',
                isVerified: false
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
        const { name, email, password, businessName, address, phone, businessType, gstin } = req.body;

        // Check if email or phone is already registered for any userType
        const existingUser = await User.findOne({ $or: [ { email }, { phone } ] });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "This email or phone number is already registered. You cannot register as both retailer and wholesaler with the same email or phone.",
            });
        }

        // Generate OTP
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create new wholesaler
        const wholesaler = await User.create({
            name,
            email,
            password,
            userType: 'wholesaler',
            businessName,
            address,
            phone,
            gstin,
            businessType,
            otp,
            otpExpiry,
            isVerified: false
        });

        // Send OTP email
        await sendOtpEmail(email, otp);

        return res.status(201).json({
            status: "success",
            message: "Wholesaler registration successful. Please verify your email with the OTP sent.",
            user: {
                id: wholesaler._id,
                name: wholesaler.name,
                email: wholesaler.email,
                businessName: wholesaler.businessName,
                businessType: wholesaler.businessType,
                gstin: wholesaler.gstin,
                userType: 'wholesaler',
                isVerified: false
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
        const { email, password, userType } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        // Check userType matches
        if (user.userType !== userType) {
            return res.status(400).json({
                status: "error",
                message: `This email is registered as a ${user.userType}. Please sign in as the correct user type.`
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

// OTP Verification Controller
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and OTP are required.'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }
        if (user.isVerified) {
            return res.status(400).json({
                status: 'error',
                message: 'User already verified.'
            });
        }
        if (!user.otp || !user.otpExpiry || user.otp !== otp) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid OTP.'
            });
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                status: 'error',
                message: 'OTP has expired.'
            });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully. Your account is now active.'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'OTP verification failed.'
        });
    }
};