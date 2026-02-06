// backend/src/routes/food.routes.js

const express = require("express");
const multer = require("multer");
const foodController = require("../controllers/food.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const foodPartnerAuth = require("../middlewares/foodPartnerAuth");

const router = express.Router();

// Multer config (video + image)
const upload = multer({ storage: multer.memoryStorage() });

/* ============================
   CREATE FOOD (FOOD PARTNER ONLY)
   ============================ */
router.post(
  "/",
  foodPartnerAuth,   // ⭐ ONLY FOOD PARTNER
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  foodController.createFood
);

/* ============================
   DELETE FOOD (OWNER ONLY)
   ============================ */
router.delete(
  "/:id",
  foodPartnerAuth,   // ⭐ ensures req.foodPartner exists
  foodController.deleteFood
);

/* ============================
   GET ALL FOOD (PUBLIC)
   ============================ */
router.get("/", foodController.getFoodItems);

/* ============================
   LIKE FOOD (USER ONLY)
   ============================ */
router.post(
  "/like",
  isAuthenticated,
  foodController.likeFood
);

/* ============================
   SAVE FOOD (USER ONLY)
   ============================ */
router.post(
  "/save",
  isAuthenticated,
  foodController.saveFood
);

/* ============================
   GET SAVED FOOD (USER ONLY)
   ============================ */
router.get(
  "/save",
  isAuthenticated,
  foodController.getSaveFood
);

module.exports = router;
