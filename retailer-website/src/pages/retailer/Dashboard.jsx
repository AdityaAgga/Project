import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Stats data
  const stats = [
    { 
      title: 'Total Orders', 
      value: '156', 
      change: '+12% from last month',
      icon: '📦'
    },
    { 
      title: 'Revenue', 
      value: '$24,560', 
      change: '+8% from last month',
      icon: '💰'
    },
    { 
      title: 'Active Products', 
      value: '45', 
      change: '+5 from last month',
      icon: '🛍️'
    },
    { 
      title: 'Pending Orders', 
      value: '12', 
      change: '-3 from last month',
      icon: '⏳'
    }
  ];

  // Recent Orders data
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

  // Recent Messages data
  const recentMessages = [
    { 
      sender: 'Tech Distributors Inc.',
      time: '10:30 AM',
      message: 'New product catalog available',
      isNew: true
    },
    { 
      sender: 'Fashion Wholesale Co.',
      time: 'Yesterday',
      message: 'Your order #1235 has been shipped',
      isNew: false
    },
    { 
      sender: 'Home & Kitchen Supplies',
      time: '2 days ago',
      message: 'Special discount available this week',
      isNew: true
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Orders</h2>
            <a href="#" className="view-all">View All</a>
          </div>
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
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

        {/* Recent Messages */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Messages</h2>
            <a href="#" className="view-all">View All</a>
          </div>
          <div className="message-list">
            {recentMessages.map((message, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-time">{message.time}</span>
                </div>
                <div className="message-content">
                  {message.message}
                  {message.isNew && <span className="new-badge">New</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 