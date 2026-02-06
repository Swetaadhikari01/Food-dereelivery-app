const jwt = require("jsonwebtoken");
const FoodPartner = require("../models/foodpartner.model");

module.exports = async function foodPartnerAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    // ⭐ If no token → allow public access
    if (!token) {
      req.foodPartner = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await FoodPartner.findById(decoded.id);

    // If token belongs to food partner → attach
    if (foodPartner) {
      req.foodPartner = foodPartner;
    } else {
      req.foodPartner = null;
    }

    next();

  } catch (err) {
    // ⭐ On error ALSO allow public
    req.foodPartner = null;
    next();
  }
};
