const express = require("express")

const router = express.Router()

const {register, registerRetailer, registerWholesaler, login} = require("../controllers/authController")

router.post("/signup",register)

router.post("/register-retailer", registerRetailer)
router.post("/register-wholesaler", registerWholesaler)

router.post("/login",login)

module.exports = router;