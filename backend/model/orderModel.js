const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  retailer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wholesaler: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
},{timestamps:true});
module.exports = mongoose.model('Order', orderSchema); 