const mongoose = require('mongoose');

const orderTrackingSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  trackingNumber: {
    type: String,
    required: true
  },
  carrier: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'out_for_delivery', 'delivered', 'error'],
    default: 'pending'
  },
  estimatedDelivery: {
    type: Date
  },
  trackingHistory: [{
    status: {
      type: String,
      required: true
    },
    location: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
orderTrackingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('OrderTracking', orderTrackingSchema); 