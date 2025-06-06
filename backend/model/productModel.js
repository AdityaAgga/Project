const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{timestamps:true});
module.exports = mongoose.model('Product', productSchema); 