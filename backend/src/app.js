// app.js (Production-safe)

const express = require("express");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");

const app = express();

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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
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

module.exports = app;
