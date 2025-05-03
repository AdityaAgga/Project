const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const getAnalytics = async (req, res) => {
  try {
    const { timeRange } = req.query;
    const wholesalerId = req.user.id;

    // Calculate date range based on timeRange
    const now = new Date();
    let startDate;
    switch (timeRange) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'quarter':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    // Get total revenue and orders
    const orders = await Order.find({
      wholesaler: wholesalerId,
      createdAt: { $gte: startDate }
    });

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;

    // Get unique customers
    const uniqueCustomers = new Set(orders.map(order => order.customer.toString()));
    const totalCustomers = uniqueCustomers.size;

    // Get sales trend data
    const salesTrend = await Order.aggregate([
      {
        $match: {
          wholesaler: wholesalerId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          sales: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Get top products
    const topProducts = await Order.aggregate([
      {
        $match: {
          wholesaler: wholesalerId,
          createdAt: { $gte: startDate }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          value: '$totalRevenue'
        }
      },
      { $sort: { value: -1 } },
      { $limit: 5 }
    ]);

    // Get revenue by category
    const revenueByCategory = await Order.aggregate([
      {
        $match: {
          wholesaler: wholesalerId,
          createdAt: { $gte: startDate }
        }
      },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $project: {
          name: '$_id',
          revenue: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      sales: salesTrend.map(item => ({
        date: item._id,
        sales: item.sales,
        orders: item.orders
      })),
      products: topProducts,
      categories: revenueByCategory,
      revenue,
      orders: totalOrders,
      customers: totalCustomers
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

module.exports = {
  getAnalytics
}; 