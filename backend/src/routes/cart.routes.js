const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth.middleware");
const cartCtrl = require("../controllers/cart.controller");

router.post("/", isAuthenticated, cartCtrl.addToCart);
router.get("/", isAuthenticated, cartCtrl.getCart);
router.delete("/:id", isAuthenticated, cartCtrl.removeFromCart);

module.exports = router;
