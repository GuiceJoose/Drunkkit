const express = require("express");
const router = express.Router();
const {
  getDrinks,
  addDrink,
  updateDrink,
  deleteDrink,
} = require("../controllers/drinkController");

router.route("/").get(getDrinks).post(addDrink);

router.route("/:id").put(updateDrink).delete(deleteDrink);

module.exports = router;
