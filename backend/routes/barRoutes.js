const express = require("express");
const router = express.Router();
const {
  getBar,
  addIngredient,
  deleteIngredient,
} = require("../controllers/barController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBar);

router
  .route("/:id")
  .delete(protect, deleteIngredient)
  .post(protect, addIngredient);

module.exports = router;
