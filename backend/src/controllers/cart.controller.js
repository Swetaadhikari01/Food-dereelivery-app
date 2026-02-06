const Cart = require("../models/cart.model");
const Food = require("../models/food.model");

exports.addToCart = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user._id;

  const existing = await Cart.findOne({ user: userId, food: foodId });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.json({ message: "Quantity updated" });
  }

  await Cart.create({ user: userId, food: foodId });
  res.json({ message: "Added to cart" });
};

exports.getCart = async (req, res) => {
  const cart = await Cart.find({ user: req.user._id })
    .populate("food");

  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};
