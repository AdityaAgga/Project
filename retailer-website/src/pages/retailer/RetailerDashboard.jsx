import React from 'react';
import { Link } from 'react-router-dom';

const RetailerDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: '📦'
    },
    {
      title: 'Revenue',
      value: '$24,560',
      change: '+8%',
      trend: 'up',
      icon: '💰'
    },
    {
      title: 'Active Products',
      value: '45',
      change: '+5',
      trend: 'up',
      icon: '🛍️'
    },
    {
      title: 'Pending Orders',
      value: '12',
      change: '-3',
      trend: 'down',
      icon: '⏳'
    }
  ];

  const recentOrders = [
    {
      id: '#1234',
      date: '2024-03-23',
      wholesaler: 'Tech Distributors Inc.',
      amount: '$1,234.00',
      status: 'Delivered'
    },
    {
      id: '#1235',
      date: '2024-03-22',
      wholesaler: 'Fashion Wholesale Co.',
      amount: '$876.00',
      status: 'Processing'
    },
    {
      id: '#1236',
      date: '2024-03-21',
      wholesaler: 'Home & Kitchen Supplies',
      amount: '$1,567.00',
      status: 'Shipped'
    }
  ];

  const recentMessages = [
    {
      sender: 'Tech Distributors Inc.',
      content: 'New product catalog available',
      time: '10:30 AM',
      unread: true
    },
    {
      sender: 'Fashion Wholesale Co.',
      content: 'Your order #1235 has been shipped',
      time: 'Yesterday',
      unread: false
    },
    {
      sender: 'Home & Kitchen Supplies',
      content: 'Special discount available this week',
      time: '2 days ago',
      unread: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
            <Link
              to="/retailer/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
            <Link
              to="/retailer/messages"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Messages
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`mt-4 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
              <Link to="/order-tracking" className="text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wholesaler</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.wholesaler}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Messages</h2>
              <Link to="/retailer/messages" className="text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{message.sender}</h3>
                    <span className="text-sm text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                  {message.unread && (
                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard; 