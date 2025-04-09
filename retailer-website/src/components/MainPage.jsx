import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <section className="hero-section" style={styles.heroSection}>
        <div className="hero-content" style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Welcome Back, Wholesaler!</h2>
          <p style={styles.heroDescription}>
            Manage your products, track orders, and grow your business effortlessly.
          </p>
          <button style={styles.heroButton}>Get Started</button>
        </div>
        <img
          src="/wholesaler.png"
          alt="Wholesaler Dashboard Image"
          style={styles.heroImage}
        />
      </section>

      <section className="quick-actions" style={styles.quickActions}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div className="action-cards" style={styles.actionCards}>
          <Link to="/product-management" style={styles.link}>
            <div className="card" style={styles.card}>
              <img
                src="/pd_management.jpeg"
                alt="Product Management Icon"
                style={styles.cardImage}
              />
              <h4 style={styles.cardTitle}>Product Management</h4>
              <p style={styles.cardDescription}>
                Add, update, or remove products from your catalog.
              </p>
            </div>
          </Link>

          <Link to="/order-tracking" style={styles.link}>
            <div className="card" style={styles.card}>
              <img
                src="/order_track.jpg"
                alt="Order Tracking Icon"
                style={styles.cardImage}
              />
              <h4 style={styles.cardTitle}>Order Tracking</h4>
              <p style={styles.cardDescription}>
                Track and manage orders placed by retailers.
              </p>
            </div>
          </Link>

          <Link to="/inventory-updates" style={styles.link}>
            <div className="card" style={styles.card}>
              <img
                src="/Inventory.jpg"
                alt="Inventory Updates Icon"
                style={styles.cardImage}
              />
              <h4 style={styles.cardTitle}>Inventory Updates</h4>
              <p style={styles.cardDescription}>
                Monitor and update your stock levels in real-time.
              </p>
            </div>
          </Link>

          <Link to="/analytics" style={styles.link}>
            <div className="card" style={styles.card}>
              <img
                src="/analytics.jpg"
                alt="Analytics Icon"
                style={styles.cardImage}
              />
              <h4 style={styles.cardTitle}>Analytics</h4>
              <p style={styles.cardDescription}>
                View sales reports and insights to optimize your business.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="featured-products" style={styles.featuredProducts}>
        <h3 style={styles.sectionTitle}>Featured Products</h3>
        <div className="product-list" style={styles.productList}>
          <div className="product-card" style={styles.productCard}>
            <img
              src="/pd_1.jpg"
              alt="Product 1"
              style={styles.productImage}
            />
            <h4 style={styles.productTitle}>Product 1</h4>
            <p style={styles.productDescription}>Description of Product 1</p>
          </div>
          <div className="product-card" style={styles.productCard}>
            <img
              src="/pd_2.jpg"
              alt="Product 2"
              style={styles.productImage}
            />
            <h4 style={styles.productTitle}>Product 2</h4>
            <p style={styles.productDescription}>Description of Product 2</p>
          </div>
          <div className="product-card" style={styles.productCard}>
            <img
              src="/pd_3.jpg"
              alt="Product 3"
              style={styles.productImage}
            />
            <h4 style={styles.productTitle}>Product 3</h4>
            <p style={styles.productDescription}>Description of Product 3</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;

const styles = {
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  heroContent: {
    flex: 1,
    marginRight: "20px",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  heroDescription: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  heroButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  heroImage: {
    width: "10%",
    height: "auto",
    borderRadius: "10px",
  },
  quickActions: {
    padding: "20px",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  actionCards: {
    display: "flex", 
    justifyContent: "space-around", 
    flexWrap: "wrap", 
    gap: "20px", 
  },
  link: {
    textDecoration: "none", 
    display: "block", 
  },
  card: {
    flex: "1 1 300px", 
    maxWidth: "300px", 
    padding: "15px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    width: "300px", 
    height: "300px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "225px",
    height: "150px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  cardDescription: {
    fontSize: "0.9rem",
    color: "#555",
    textAlign: "center", 
  },

  featuredProducts: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  productList: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  productCard: {
    width: "30%",
    padding: "15px",
    margin: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display:"flex",
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center",
  },
  productImage: {
    width: "300px",
    height: "200px",
    marginBottom: "10px",
  },
  productTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  productDescription: {
    fontSize: "0.9rem",
    color: "#555",
  },
};