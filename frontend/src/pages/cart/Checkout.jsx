import { useCart } from "../../context/CartContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const Checkout = () => {
  const { cart, clearCart } = useCart(); // ✅ FIXED (cart not cartItems)
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Safe total calculation
  const totalAmount = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const placeOrder = async () => {
    if (loading) return;

    try {
      if (!address.trim() || !phone.trim()) {
        alert("Enter address and phone");
        return;
      }

      if (!cart || cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      setLoading(true);

      const items = cart.map(item => ({
        food: item._id,
        quantity: item.quantity,
        price: item.price
      }));

      const payload = {
        address,
        phone,
        paymentMode: "COD",
        totalAmount,
        items
      };

      await api.post("/api/orders/cart", payload, {
        withCredentials: true
      });

      alert("✅ Order placed successfully!");
      clearCart();
      navigate("/orders");

    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>

      <input
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={styles.input}
      />

      <p>Payment Mode: <b>Cash on Delivery</b></p>

      <h3>Total: ₹{totalAmount}</h3>

      <button onClick={placeOrder} disabled={loading} style={styles.button}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "500px", margin: "auto" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Checkout;
