const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET);
  };

// User Registration Controller
exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        if (password.length < 6) {
            return res.status(400).json({
                status: "error",
                message: "Password must be at least 6 characters long",
            });
        }

        const hash = await bcrypt.hash(password, 12);

        const user = await User.create({ email, password: hash, name });

        if (!user) {
            return res.status(503).json({
                status: "error",
                message: "Registration failed",
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Registration successful",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: "error",
                message: "Invalid password",
            });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
        });
    }
};