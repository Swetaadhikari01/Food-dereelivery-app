const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth.middleware");
const orderController = require("../controllers/order.controller");

// Place Order
router.post("/cart", isAuthenticated, orderController.placeOrder);

// Get Logged-in User Orders
router.get("/my", isAuthenticated, async (req, res) => {
  try {
    const orders = await require("../models/order.model")
      .find({ user: req.user._id })
      .populate("restaurant", "name")
      .populate({
        path: "items.food",
        select: "name image price"
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

