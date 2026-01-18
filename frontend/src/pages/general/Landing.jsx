import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>FoodReels</h2>

        <div style={styles.navRight}>
          <Link to="/user/login" style={styles.navLink}>
            User Login
          </Link>
          <Link to="/food-partner/login" style={styles.navLink}>
            Food Partner Login
          </Link>
          <Link to="/register" style={styles.navBtn}>
            Register
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Discover food through videos, not menus
        </h1>
        <p style={styles.heroSubtitle}>
          A next-generation food discovery platform where users explore food
          reels and food partners showcase their dishes visually.
        </p>

        <p style={styles.creator}>
          Created by <strong>Sweta Adhikari</strong>
        </p>

        <div style={styles.heroBtns}>
          <Link to="/register" style={styles.primaryBtn}>
            Get Started
          </Link>
          <Link to="/user/login" style={styles.secondaryBtn}>
            Watch Food Reels
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section style={styles.section}>
        <h2>About FoodReels</h2>
        <p>
          FoodReels is inspired by platforms like Zomato but focuses on
          short-form video content. Instead of reading long menus, users can
          watch real food videos uploaded by food partners and decide instantly.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.sectionAlt}>
        <h2>How It Works</h2>

        <div style={styles.steps}>
          <div style={styles.stepCard}>
            <h3>👤 For Users</h3>
            <ul>
              <li>Register & login</li>
              <li>Watch food reels</li>
              <li>Like & save dishes</li>
              <li>Discover food partners</li>
            </ul>
          </div>

          <div style={styles.stepCard}>
            <h3>🏪 For Food Partners</h3>
            <ul>
              <li>Create food profile</li>
              <li>Upload food videos</li>
              <li>Reach more customers</li>
              <li>Grow your food business</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOD GALLERY */}
      <section style={styles.gallerySection}>
        <h2>Popular Food Categories</h2>

        <div style={styles.gallery}>
          {foodImages.map((img, index) => (
            <div key={index} style={styles.card}>
              <img src={img.src} alt={img.title} style={styles.image} />
              <h4>{img.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2>Why Choose FoodReels?</h2>

        <div style={styles.features}>
          <div style={styles.feature}>🎥 Video-first experience</div>
          <div style={styles.feature}>❤️ Like & save food</div>
          <div style={styles.feature}>🔐 Secure authentication</div>
          <div style={styles.feature}>🚀 Food partner growth</div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Join FoodReels Today</h2>
        <p>Start discovering food or promote your food business.</p>
        <Link to="/register" style={styles.ctaBtn}>
          Register Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} FoodReels | Built by Sweta Adhikari
      </footer>
    </div>
  );
};

/* ===== FOOD IMAGES (FIXED PIZZA IMAGE) ===== */

const foodImages = [
  {
    title: "Burger",
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    title: "Pizza",
    src: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
  },
  {
    title: "Biryani",
    src: "https://images.unsplash.com/photo-1604908554105-088645debe26",
  },
  {
    title: "Street Food",
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
];

/* ===== STYLES ===== */

const styles = {
  container: { fontFamily: "Inter, sans-serif" },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 50px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  logo: { color: "#e23744", fontWeight: 800, fontSize: "1.6rem" },

  navRight: { display: "flex", gap: "18px", alignItems: "center" },

  navLink: { textDecoration: "none", color: "#333", fontWeight: 500 },

  navBtn: {
    background: "#e23744",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },

  hero: {
    textAlign: "center",
    padding: "100px 20px",
    background:
      "linear-gradient(180deg, rgba(226,55,68,0.1), rgba(255,255,255,1))",
  },

  heroTitle: { fontSize: "3rem", fontWeight: 800 },
  heroSubtitle: { maxWidth: "700px", margin: "20px auto", opacity: 0.8 },
  creator: { opacity: 0.7 },

  heroBtns: { marginTop: "30px", display: "flex", gap: "16px", justifyContent: "center" },

  primaryBtn: {
    background: "#e23744",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
  },

  secondaryBtn: {
    border: "2px solid #e23744",
    color: "#e23744",
    padding: "12px 26px",
    borderRadius: "10px",
    textDecoration: "none",
  },

  section: { padding: "70px 20px", textAlign: "center", maxWidth: "900px", margin: "auto" },
  sectionAlt: { padding: "70px 20px", background: "#f8f8f8" },

  steps: { display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" },
  stepCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    width: "280px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  gallerySection: { padding: "70px 20px", textAlign: "center" },
  gallery: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "24px", padding: "40px" },

  card: { borderRadius: "14px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  image: { width: "100%", height: "180px", objectFit: "cover" },

  features: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "20px" },
  feature: { background: "#f1f1f1", padding: "20px", borderRadius: "12px" },

  cta: { textAlign: "center", padding: "80px 20px", background: "#e23744", color: "#fff" },
  ctaBtn: {
    background: "#fff",
    color: "#e23744",
    padding: "14px 30px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    marginTop: "20px",
    display: "inline-block",
  },

  footer: { textAlign: "center", padding: "20px", opacity: 0.7 },
};

export default Landing;
