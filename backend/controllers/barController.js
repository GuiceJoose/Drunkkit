const { urlencoded } = require("express");
const asyncHandler = require("express-async-handler");

const Bar = require("../models/barModel");

// @desc Get bar
// @route GET /api/mybar
// @access Private
const getBar = asyncHandler(async (req, res) => {
  const bar = await Bar.findOne({ user: req.user.id });
  res.status(200).json(bar);
});

// @desc Add ingredient
// @route POST /api/mybar/:id
// @access Private
const addIngredient = asyncHandler(async (req, res) => {
  const bar = await Bar.findOneAndUpdate(
    { user: req.user.id },
    { $push: { items: req.params.id } },
    { new: true }
  );
  res.status(201).json(bar);
});

// @desc Delete ingredient
// @route DELETE /api/ingredient/:ingredient
// @access Private
const deleteIngredient = asyncHandler(async (req, res) => {
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const bar = await Bar.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { items: req.params.id } },
    { new: true }
  );
  res.status(201).json(bar);
});

module.exports = {
  getBar,
  addIngredient,
  deleteIngredient,
};
