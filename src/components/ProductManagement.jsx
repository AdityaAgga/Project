import React, { useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, image: "https://via.placeholder.com/100", name: "Product 1", price: "$50" },
    { id: 2, image: "https://via.placeholder.com/100", name: "Product 2", price: "$75" },
    { id: 3, image: "https://via.placeholder.com/100", name: "Product 3", price: "$100" },
  ]);

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ image: "", name: "", price: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (newProduct.image && newProduct.name && newProduct.price) {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...newProduct }, 
      ]);
      setNewProduct({ image: "", name: "", price: "" }); 
      setIsAddFormVisible(false); 
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleUpdateProduct = (id) => {
    const updatedName = prompt("Enter updated product name:");
    const updatedPrice = prompt("Enter updated product price:");

    if (updatedName && updatedPrice) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, name: updatedName, price: updatedPrice } : product
        )
      );
    } else {
      alert("Update canceled or invalid input.");
    }
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Management</h2>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => setIsAddFormVisible(true)}>
          Add New Product
        </button>
        <button style={styles.button}>Refresh List</button>
      </div>

      {isAddFormVisible && (
        <div style={styles.formContainer}>
          <h3>Add New Product</h3>
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button style={styles.addButton} onClick={handleAddProduct}>
            Add Product
          </button>
          <button style={styles.cancelButton} onClick={() => setIsAddFormVisible(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Product List */}
      <div style={styles.productList}>
        <h3>Product List</h3>
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <h4 style={styles.productName}>{product.name}</h4>
              <p style={styles.productPrice}>{product.price}</p>
              <div style={styles.productActions}>
                <button
                  style={styles.actionButton}
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Update
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

// Inline Styles
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
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  formContainer: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  productList: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  productCard: {
    flex: "1 1 calc(25% - 20px)", 
    padding: "15px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  productImage: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  productName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  productPrice: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  },
  productActions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};