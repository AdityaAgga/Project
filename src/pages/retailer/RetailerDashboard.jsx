import React from 'react';
import { Link } from 'react-router-dom';

const RetailerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Wholesaler: ABC Corp</p>
                <p className="text-sm">New product catalog available</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Wholesaler: XYZ Ltd</p>
                <p className="text-sm">Order #1234 has been shipped</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/retailer/orders" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition">
                View Orders
              </Link>
              <Link to="/retailer/products" className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition">
                Browse Products
              </Link>
              <Link to="/retailer/messages" className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-center hover:bg-purple-700 transition">
                Messages
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#1234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-23</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,234.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#1235</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-22</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$876.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard; 