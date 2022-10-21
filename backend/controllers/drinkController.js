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
// @route POST /api/drinks
// @access Private
const addDrink = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const drink = await Drink.create({
    user: req.user.id,
    name: req.body.name,
    recipe: req.body.recipe,
    instructions: req.body.instructions,
    glass: req.body.glass,
    voteCount: 0,
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

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // check that loged in user matches drink user
  if (drink.user.toString() !== req.user.id) {
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
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // check that loged in user matches drink user
  if (drink.user.toString() !== req.user.id) {
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
