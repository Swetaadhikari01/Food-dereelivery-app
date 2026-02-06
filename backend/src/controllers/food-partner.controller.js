const FoodPartner = require("../models/foodpartner.model");
const Food = require("../models/food.model");

/**
 * Public Profile (Users + Partners both use this)
 * Adds isOwner flag so frontend knows permissions
 */
async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;

    const foodPartner = await FoodPartner.findById(foodPartnerId).select(
      "name hotelName address avatar"
    );

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    const foodItems = await Food.find({ foodPartner: foodPartnerId }).select(
      "name price image video"
    );

    // ⭐ OWNER CHECK (THIS FIXES YOUR PROBLEM)
    let isOwner = false;

    // req.foodPartner comes from auth middleware
    if (req.foodPartner && req.foodPartner._id.toString() === foodPartnerId) {
      isOwner = true;
    }

    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        hotelName: foodPartner.hotelName,
        address: foodPartner.address,
        avatar: foodPartner.avatar,
        foodItems,
        isOwner, // 🔥 THIS CONTROLS CREATE/DELETE BUTTONS
      },
    });
  } catch (err) {
    console.error("getFoodPartnerById error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Private Dashboard Profile (only logged partner)
 */
async function getProfile(req, res) {
  try {
    const foodPartner = req.foodPartner;

    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const foodItems = await Food.find({ foodPartner: foodPartner._id }).select(
      "name price image video"
    );

    res.status(200).json({
      message: "Profile fetched successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        hotelName: foodPartner.hotelName,
        address: foodPartner.address,
        avatar: foodPartner.avatar,
        foodItems,
        isOwner: true, // Always true here
      },
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Update profile
 */
async function updateProfile(req, res) {
  try {
    const foodPartner = req.foodPartner;

    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, hotelName, address } = req.body;

    if (name) foodPartner.name = name;
    if (hotelName) foodPartner.hotelName = hotelName;
    if (address) foodPartner.address = address;

    await foodPartner.save();

    res.status(200).json({
      message: "Profile updated successfully",
      foodPartner,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getFoodPartnerById,
  getProfile,
  updateProfile,
};
