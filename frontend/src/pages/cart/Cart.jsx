import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center" }}>Cart is empty 🛒</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>🛒 My Cart</h2>

      {cart.map(item => (
        <div key={item._id} style={styles.card}>
          <img src={item.image} alt={item.name} style={styles.image} />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div style={styles.qtyRow}>
              <button onClick={() => decreaseQty(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item._id)}>+</button>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "bold" }}>
              ₹{item.price * item.quantity}
            </p>
            <button
              style={styles.removeBtn}
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <h2 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ₹{total}
      </h2>

      {/* CHECKOUT BUTTON */}
      <div style={{ textAlign: "right", marginTop: "15px" }}>
        <button
          style={styles.checkoutBtn}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "15px"
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px"
  },
  removeBtn: {
    background: "#e23744",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  checkoutBtn: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  }
};

export default Cart;
