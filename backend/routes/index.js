const express = require("express")

const router = express.Router();

const authRoutes = require("./authRoutes")
const productRoutes = require("./productRoutes")
const orderRoutes = require("./orderRoutes")
const messageRoutes = require("./messageRoutes")
const dashboardRoutes = require("./dashboardRoutes")
const paymentRoutes = require("./paymentRoutes")

router.use("/auth",authRoutes)
router.use("/products", productRoutes)
router.use("/orders", orderRoutes)
router.use("/messages", messageRoutes)
router.use("/dashboard", dashboardRoutes)
router.use("/payments", paymentRoutes)

module.exports = router;
