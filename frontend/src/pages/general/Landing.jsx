import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';


const Landing = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/api/food")
      .then(res => {
        setFoods(res.data.foods || [])   // ✅ CORRECT
      })
      .catch(() => setFoods([]))
  }, [])


  const handleAddToCart = (food) => {
    addToCart(food);
    alert("Added to cart 🛒");
    navigate("/"); // optional, but matches e-commerce UX
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* HERO */}
      <section style={styles.hero}>
        <h1>
          Discover <span style={{ color: '#e23744' }}>Delicious</span> Food
        </h1>
        <p>Order food directly from top food partners created by Dheeraj Adhikari</p>

        {/* REGISTER BUTTON */}
        <Link to="/register" style={styles.registerBtn}>
          Register
        </Link>
      </section>


      {/* FOOD LIST */}
      <section style={{ padding: '40px 20px' }}>
        <h2>All Food Items</h2>

        {foods.length === 0 && <p>No food items yet</p>}

        <div style={styles.foodGrid}>
          {foods.map(food => (
            <div
              key={food._id}
              style={styles.foodCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
              }}
            >


              {/* FOOD IMAGE */}
              {food.image && (
  <img
    src={food.image}
    alt={food.name}
    style={styles.media}
  />
)}



              {/* FOOD INFO */}
              <h3>{food.name}</h3>
              <p style={{ fontWeight: '700', color: '#e23744' }}>
                ₹{food.price}
              </p>

              {/* RESTAURANT LINK */}
              <Link
                to={`/food-partner/${food.foodPartner?._id || food.foodPartner}`}
                style={styles.restaurantLink}
              >
                View Restaurant
              </Link>

              {/* ACTION */}
              <div style={styles.btnGroup}>
                <button
                  style={styles.orderBtn}
                  onClick={() => handleAddToCart(food)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'linear-gradient(180deg, rgba(226,55,68,0.1), #fff)',
  },
  foodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  foodCard: {
    transition: 'transform 0.2s ease',
    background: '#fff',
    borderRadius: '14px',
    padding: '12px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
    textAlign: 'center',
    overflow: 'hidden'   // 🔥 VERY IMPORTANT
  },

  media: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px'
  },
  orderBtn: {
    background: '#e23744',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  restaurantLink: {
    display: 'block',
    marginTop: '6px',
    color: '#555',
    fontSize: '0.95rem',
    textDecoration: 'none',
    fontWeight: '600'
  },
  registerBtn: {
    display: 'inline-block',
    marginTop: '18px',
    padding: '10px 22px',
    background: '#e23744',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background 0.2s ease',
  },

};

export default Landing;
