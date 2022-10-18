const asyncHandler = require("express-async-handler");
const { globalAgent } = require("http");

const Drink = require("../models/drinkModel");
const User = require("../models/userModel");

// @desc Get drinks
// @route GET /api/drinks
// @access Public
const getDrinks = asyncHandler(async (req, res) => {
  const drinks = await Drink.find();
  res.status(200).json(drinks);
});

// @desc Add drink
// @route PUT /api/drinks
// @access Private
const addDrink = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const drink = await Drink.create({
    name: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(drink);
});

// @desc Update drink
// @route PUT /api/drinks/:id
// @access Private
const updateDrink = asyncHandler(async (req, res) => {
  const drink = await Drink.findById(req.params.id);

  if (!drink) {
    res.status(400);
    throw new Error("Drink not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // check that loged in user matches drink user
  if (drink.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedDrink);
});

// @desc Delete drink
// @route DELETE /api/drinks/:id
// @access Private
const deleteDrink = asyncHandler(async (req, res) => {
  const drink = await Drink.findById(req.params.id);
  if (!drink) {
    res.status(400);
    throw new Error("Drink not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // check that loged in user matches drink user
  if (drink.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await drink.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDrinks,
  addDrink,
  updateDrink,
  deleteDrink,
};
