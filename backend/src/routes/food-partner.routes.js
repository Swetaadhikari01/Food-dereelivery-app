const express = require("express");
const router = express.Router();
const foodPartnerController = require("../controllers/food-partner.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const foodPartnerAuth = require("../middlewares/foodPartnerAuth"); // ⭐ ADD THIS

// PRIVATE route → logged-in partner dashboard
router.get("/profile/me", isAuthenticated, foodPartnerController.getProfile);

// PUBLIC route → anyone can see profile
// BUT we attach foodPartnerAuth to detect owner
router.get("/:id", foodPartnerAuth, foodPartnerController.getFoodPartnerById);

module.exports = router;
