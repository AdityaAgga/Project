const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const messageRoutes = require('./messages');
const analyticsRoutes = require('./analytics');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/messages', messageRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router; 