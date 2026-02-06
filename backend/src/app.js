<<<<<<< HEAD
// app.js (Production-safe)

const express = require("express");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
=======
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
>>>>>>> dcf3948 (updates)

// ROUTES
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
const ordersRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart.routes"); // ✅ ADD CART ROUTE

// CREATE APP FIRST
const app = express();

<<<<<<< HEAD
/* -------------------- CORS CONFIG -------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-dereelivery-frontend.onrender.com"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // 🔥 IMPORTANT: handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


/* -------------------- MIDDLEWARE -------------------- */
=======
/* ================================
   MIDDLEWARES
================================ */
app.use(
   cors({
      origin: "http://localhost:5173", // frontend URL
      credentials: true,
   })
);
>>>>>>> dcf3948 (updates)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD

/* -------------------- ROUTES -------------------- */
=======
>>>>>>> dcf3948 (updates)

/* ================================
   STATIC FILES (IMAGES & VIDEOS)
================================ */
app.use("/uploads", express.static("uploads"));


/* ================================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
<<<<<<< HEAD
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

/* -------------------- ERROR HANDLER -------------------- */

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
=======
   res.send("Food Delivery Backend Running 🚀");
});

/* ================================
   API ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);
app.use("/api/cart", cartRoutes);     // ✅ CART API
app.use("/api/orders", ordersRoutes); // ✅ ORDER API
>>>>>>> dcf3948 (updates)

module.exports = app;
