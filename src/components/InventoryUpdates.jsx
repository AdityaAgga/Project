import React from "react";

const InventoryUpdates = () => {
  const inventory = [
    { id: 1, product: "Product X", stock: 5 },
    { id: 2, product: "Product Y", stock: 12 },
    { id: 3, product: "Product Z", stock: 0 },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inventory Updates</h2>
      <div style={styles.inventoryList}>
        {inventory.map((item) => (
          <div key={item.id} style={styles.item}>
            <span>{item.product}</span>
            <span style={item.stock <= 5 ? styles.lowStock : styles.normalStock}>
              Stock: {item.stock}
            </span>
          </div>
        ))}
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
  inventoryList: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  lowStock: {
    color: "red",
    fontWeight: "bold",
  },
  normalStock: {
    color: "green",
  },
};

export default InventoryUpdates;