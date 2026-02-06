import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ReelFeed from "../../components/ReelFeed";
import "../../styles/profile.css";
import { useCart } from "../../context/CartContext";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("foods");
  const [orders, setOrders] = useState([]);

  // 🔹 LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get(`/api/food-partner/${id}`, {
          withCredentials: true,
        });

        const partner = res.data.foodPartner;

        const formattedItems = partner.foodItems.map((item) => ({
          ...item,
          image: item.image?.data
            ? `data:${item.image.contentType};base64,${item.image.data}`
            : item.image || null,
          video: item.video?.data
            ? `data:${item.video.contentType};base64,${item.video.data}`
            : item.video || null,
        }));

        setProfile({ ...partner, foodItems: formattedItems });

        // Load orders if owner
        if (partner.isOwner) {
          const ordersRes = await api.get("/api/orders/partner", {
            withCredentials: true,
          });
          setOrders(ordersRes.data.orders);
        }
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };

    loadProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  const foods = profile.foodItems.filter((item) => item.image);
  const reels = profile.foodItems.filter((item) => item.video);

  // 🛒 ORDER
  const handleOrder = (food) => {
    addToCart(food);
    alert("Added to cart 🛒");
  };

  // 🗑 DELETE FOOD / REEL
  const handleDeleteFood = async (foodId) => {
    try {
      await api.delete(`/api/food/${foodId}`, { withCredentials: true });

      setProfile((prev) => ({
        ...prev,
        foodItems: prev.foodItems.filter((item) => item._id !== foodId),
      }));

      alert("Deleted successfully 🗑️");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // 📦 UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, status) => {
    await api.put(
      `/api/orders/status/${orderId}`,
      { status },
      { withCredentials: true }
    );
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <main className="profile-page">
      {/* HEADER */}
      <section className="profile-header">
        <img
          className="profile-avatar"
          src={
            profile.avatar ||
            "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
          }
          alt={profile.name}
        />
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.address}</p>
          <p>
            🍽 {foods.length} Foods | 🎬 {reels.length} Reels
          </p>

          {/* ➕ CREATE FOOD (OWNER ONLY) */}
          {profile.isOwner && (
            <button
              className="create-food-btn"
              onClick={() => navigate("/create-food")}
            >
              ➕ Create Food
            </button>
          )}
        </div>
      </section>

      {/* TABS */}
      <div className="profile-tabs">
        <button
          onClick={() => setActiveTab("foods")}
          className={activeTab === "foods" ? "active" : ""}
        >
          🍔 Foods
        </button>
        <button
          onClick={() => setActiveTab("reels")}
          className={activeTab === "reels" ? "active" : ""}
        >
          🎬 Reels
        </button>
        {profile.isOwner && (
          <button
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "active" : ""}
          >
            📦 Orders
          </button>
        )}
      </div>

      {/* FOOD GRID */}
      {activeTab === "foods" && (
        <section className="insta-grid">
          {foods.length === 0 && <p>No food items</p>}
          {foods.map((item) => (
            <div key={item._id} className="insta-post">
              <img src={item.image} alt={item.name} />
              <div className="post-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                {!profile.isOwner ? (
                  <button onClick={() => handleOrder(item)}>Order Now</button>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFood(item._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* REELS */}
      {activeTab === "reels" && (
        <ReelFeed
          items={reels}
          emptyMessage="No reels uploaded"
          onDelete={
            profile.isOwner
              ? (item) => handleDeleteFood(item._id)
              : undefined
          }
        />
      )}

      {/* ORDERS DASHBOARD */}
      {activeTab === "orders" && profile.isOwner && (
        <section className="orders-section">
          {orders.length === 0 && <p>No orders yet</p>}
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>{order.food.name}</h4>
              <p>User: {order.user.name}</p>
              <p>Status: {order.status}</p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Profile;
