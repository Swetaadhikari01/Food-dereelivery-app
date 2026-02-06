const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      data: String,        // base64 string
      contentType: String, // image/png, image/jpeg
    },

    video: {
      data: String,
      contentType: String,
    },

    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner", // must match foodPartner model name
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    savesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


// 🔥 CRITICAL FIXES
module.exports =
  mongoose.models.Food ||
  mongoose.model("Food", foodSchema);
