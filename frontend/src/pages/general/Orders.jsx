import { useEffect, useState } from "react";
import api from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/my", {
          withCredentials: true,
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h3 style={{ padding: "20px" }}>Loading orders...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            margin: "15px 0",
            padding: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h4>🏪 Restaurant: {order.restaurant?.name || "N/A"}</h4>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Delivery Address:</b> {order.address}</p>

          <h5>🍽 Items:</h5>
          {order.items?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
                background: "#f9f9f9",
                padding: "8px",
                borderRadius: "8px"
              }}
            >
              {/* FOOD IMAGE */}

              {item.food?.image?.data && (
                <img
                  src={`data:${item.food.image.contentType};base64,${item.food.image.data}`}
                  alt={item.food.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              )}



              <div>
                <p style={{ margin: 0 }}>
                  <b>{item.food?.name}</b>
                </p>
                <p style={{ margin: 0 }}>
                  Qty: {item.quantity} × ₹{item.food?.price}
                </p>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  ₹{(item.food?.price || 0) * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <h3>Total: ₹{order.totalAmount}</h3>
        </div>
      ))}
    </div>
  );
};

export default Orders;
