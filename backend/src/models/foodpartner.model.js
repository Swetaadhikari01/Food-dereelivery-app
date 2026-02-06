const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


// 🔥 CRITICAL FIX
// 1. Model name MUST match ref: "FoodPartner"
// 2. Prevents OverwriteModelError
module.exports =
  mongoose.models.FoodPartner ||
  mongoose.model("FoodPartner", foodPartnerSchema);
