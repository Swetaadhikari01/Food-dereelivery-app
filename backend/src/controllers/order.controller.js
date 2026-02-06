const Order = require("../models/order.model");
const Food = require("../models/food.model");
require("../models/foodpartner.model");

// ================= PLACE ORDER =================
exports.placeOrder = async (req, res) => {
  try {
    const { items, address, phone } = req.body;   // ❌ removed totalAmount from body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🔥 Fetch all foods to calculate correct total
    const foodIds = items.map(item => item.food);
    const foods = await Food.find({ _id: { $in: foodIds } });

    if (foods.length === 0) {
      return res.status(400).json({ message: "Invalid food item" });
    }

    // 🔥 Calculate total safely from DB prices
    let totalAmount = 0;
    const updatedItems = items.map(item => {
      const food = foods.find(f => f._id.toString() === item.food);
      const price = food.price;
      totalAmount += price * item.quantity;

      return {
        food: food._id,
        quantity: item.quantity,
        price: price
      };
    });

    // Get restaurant from first food item
    const firstFood = foods[0];

    const order = await Order.create({
      user: req.user._id,
      restaurant: firstFood.foodPartner,
      items: updatedItems,
      totalAmount,   // ✅ correct total saved
      address,
      phone,
      status: "pending"
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET MY ORDERS =================
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name")
      .populate("items.food", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
