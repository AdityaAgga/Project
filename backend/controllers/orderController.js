const Order = require('../model/orderModel');

exports.getOrders = async (req, res) => {
  try {
    const filter = req.user.userType === 'wholesaler'
      ? { wholesaler: req.user.id }
      : { retailer: req.user.id };
    const orders = await Order.find(filter).populate('retailer wholesaler products');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { wholesaler, products, amount, status } = req.body;
    const order = new Order({
      retailer: req.user.id,
      wholesaler,
      products,
      amount,
      status
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 