import React from "react";

const OrderTracking = () => {
  const orders = [
    { id: 1, product: "Product A", status: "Shipped" },
    { id: 2, product: "Product B", status: "Processing" },
    { id: 3, product: "Product C", status: "Delivered" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order Tracking</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order ID</th>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={styles.tr}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.product}</td>
              <td style={styles.td}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
  },
};

export default OrderTracking;