const express = require('express');
const router = express.Router();
const OrderTracking = require('../models/OrderTracking');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get tracking information for an order
router.get('/orders/:orderId/tracking', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the user is authorized to view this order
    if (order.user.toString() !== req.user.id && order.wholesaler.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    const tracking = await OrderTracking.findOne({ order: req.params.orderId });
    if (!tracking) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tracking information (for wholesalers)
router.put('/orders/:orderId/tracking', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the user is the wholesaler
    if (order.wholesaler.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update tracking information' });
    }

    const { trackingNumber, carrier, status, location, description } = req.body;

    let tracking = await OrderTracking.findOne({ order: req.params.orderId });
    if (!tracking) {
      tracking = new OrderTracking({
        order: req.params.orderId,
        trackingNumber,
        carrier,
        status
      });
    } else {
      tracking.trackingNumber = trackingNumber;
      tracking.carrier = carrier;
      tracking.status = status;
    }

    // Add tracking history entry
    tracking.trackingHistory.push({
      status,
      location,
      description,
      timestamp: new Date()
    });

    await tracking.save();
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update estimated delivery date
router.patch('/orders/:orderId/tracking/estimated-delivery', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the user is the wholesaler
    if (order.wholesaler.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update delivery date' });
    }

    const { estimatedDelivery } = req.body;
    const tracking = await OrderTracking.findOneAndUpdate(
      { order: req.params.orderId },
      { estimatedDelivery },
      { new: true }
    );

    if (!tracking) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 