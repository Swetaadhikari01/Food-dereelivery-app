// backend/src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const FoodPartner = require("../models/foodpartner.model");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Please login first" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      req.role = "user";
      return next();
    }

    // Check if food partner
    const foodPartner = await FoodPartner.findById(decoded.id);
    if (foodPartner) {
      req.foodPartner = foodPartner;
      req.role = "food-partner";
      return next();
    }

    return res.status(401).json({ message: "Invalid token" });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { isAuthenticated };
