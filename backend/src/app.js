
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// ROUTES
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
const ordersRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart.routes");

const app = express();

/* =====================================================
   ✅ CORS CONFIG (FIXED FOR LOCAL + PRODUCTION)
===================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-dereelivery-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, mobile apps

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =====================================================
   MIDDLEWARES
===================================================== */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================================================
   STATIC FILES
===================================================== */
app.use("/uploads", express.static("uploads"));

/* =====================================================
   TEST ROUTE
===================================================== */
app.get("/", (req, res) => {
  res.status(200).send("Food Delivery Backend Running 🚀");
});

/* =====================================================
   API ROUTES (ONLY ONCE)
===================================================== */
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);

/* =====================================================
   ERROR HANDLER
===================================================== */
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
