import React from "react";

const Analytics = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Analytics</h2>
      <div style={styles.metrics}>
        <div style={styles.metricCard}>
          <h3>Total Sales</h3>
          <p>$50,000</p>
        </div>
        <div style={styles.metricCard}>
          <h3>Pending Orders</h3>
          <p>15</p>
        </div>
        <div style={styles.metricCard}>
          <h3>Total Revenue</h3>
          <p>$100,000</p>
        </div>
      </div>
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
  metrics: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  metricCard: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "30%",
    margin: "10px",
  },
};

export default Analytics;