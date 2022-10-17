const asyncHandler = require("express-async-handler");

// @desc Get drinks
// @route GET /api/drinks
// @access Public
const getDrinks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getdrink" });
});

// @desc Add drink
// @route PUT /api/drinks
// @access Private
const addDrink = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  console.log(req.body);
  res.status(200).json({ message: "set drink" });
});

// @desc Update drink
// @route PUT /api/drinks/:id
// @access Private
const updateDrink = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update drink ${req.params.id}` });
});

// @desc Delete drink
// @route DELETE /api/drinks/:id
// @access Private
const deleteDrink = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete drink ${req.params.id}` });
});

module.exports = {
  getDrinks,
  addDrink,
  updateDrink,
  deleteDrink,
};
