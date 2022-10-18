const express = require("express");
const router = express.Router();
const {
  getDrinks,
  addDrink,
  updateDrink,
  deleteDrink,
} = require("../controllers/drinkController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getDrinks).post(protect, addDrink);

router.route("/:id").put(protect, updateDrink).delete(protect, deleteDrink);

module.exports = router;
