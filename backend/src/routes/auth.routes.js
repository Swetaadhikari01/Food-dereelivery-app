const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

// EXISTING AUTH ROUTES ABOVE 👆

// ✅ ADD THIS
router.get("/me", isAuthenticated, (req, res) => {
  if (req.role === "user") {
    return res.json({ role: "user", user: req.user });
  }

  if (req.role === "food-partner") {
    return res.json({ role: "food-partner", foodPartner: req.foodPartner });
  }

  res.status(401).json({ message: "Not authenticated" });
});

// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)



// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)


module.exports = router;




