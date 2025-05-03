const express = require("express")

const router = express.Router()

const {register, registerRetailer, registerWholesaler, login, verifyOtp} = require("../controllers/authController")

router.post("/signup",register)

router.post("/register-retailer", registerRetailer)
router.post("/register-wholesaler", registerWholesaler)

router.post("/login",login)

// OTP verification route
router.post("/verify-otp", verifyOtp)

module.exports = router;