const express = require('express');
const router = express.Router();
const Product = require('../model/productModel');
const Order = require('../model/orderModel');
const Message = require('../model/messageModel');
const auth = require('../middleware/auth');

router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.userType;

    let stats = {};

    if (userType === 'retailer') {
      // Retailer stats
      const pendingOrders = await Order.countDocuments({ 
        buyer: userId, 
        status: { $in: ['Processing', 'Pending'] } 
      });
      
      const totalProducts = await Product.countDocuments({ 
        isAvailable: true 
      });

      const recentOrders = await Order.find({ buyer: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('products.product');

      const recentMessages = await Message.find({ 
        $or: [{ to: userId }, { from: userId }] 
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('from to');

      stats = {
        pendingOrders,
        totalProducts,
        recentOrders,
        recentMessages
      };
    } else if (userType === 'wholesaler') {
      // Wholesaler stats
      const totalProducts = await Product.countDocuments({ owner: userId });
      const activeOrders = await Order.countDocuments({ 
        wholesaler: userId, 
        status: 'Processing' 
      });
      const pendingMessages = await Message.countDocuments({ to: userId });
      
      const monthlyRevenueAgg = await Order.aggregate([
        { $match: { wholesaler: require('mongoose').Types.ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      
      const monthlyRevenue = monthlyRevenueAgg[0]?.total || 0;

      stats = {
        totalProducts,
        activeOrders,
        pendingMessages,
        monthlyRevenue
      };
    }

    res.json(stats);
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get recent messages
router.get('/messages/recent', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({
      $or: [{ to: userId }, { from: userId }]
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('from to');
    
    res.json(messages);
  } catch (err) {
    console.error('Recent messages error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch recent messages'
    });
  }
});

// Get recent orders
router.get('/orders/recent', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.userType;
    
    const query = userType === 'retailer' 
      ? { buyer: userId }
      : { wholesaler: userId };
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('products.product');
    
    res.json(orders);
  } catch (err) {
    console.error('Recent orders error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch recent orders'
    });
  }
});

module.exports = router; 