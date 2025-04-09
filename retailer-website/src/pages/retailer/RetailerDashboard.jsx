import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-actions">
          <Link
            to="/retailer/products"
            className="action-button primary"
          >
            Browse Products
          </Link>
          <Link
            to="/retailer/messages"
            className="action-button secondary"
          >
            Messages
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <p className="stat-title">{stat.title}</p>
            <p className="stat-value">{stat.value}</p>
            <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Orders</h2>
            <Link to="/order-tracking" className="view-all">
              View All
            </Link>
          </div>
          <div className="table-container">
            <table className="recent-orders">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Wholesaler</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.wholesaler}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
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
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Messages</h2>
            <Link to="/retailer/messages" className="view-all">
              View All
            </Link>
          </div>
          <div className="message-list">
            {recentMessages.map((message, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <h3 className="message-sender">{message.sender}</h3>
                  <span className="message-time">{message.time}</span>
                </div>
                <div className="message-content">
                  <p>{message.content}</p>
                  {message.unread && (
                    <span className="new-badge">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard; 