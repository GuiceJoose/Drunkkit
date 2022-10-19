const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add a name for this drink"],
  },
  recipe: [
    {
      quantity: {
        type: Number,
        required: [true, "Please add quantity of ingredient"],
      },
      ingredient: { type: string, required: [true, "Please add ingredient"] },
    },
  ],
  instructions: {
    type: String,
    required: [true, "Please add instruction for making this drink"],
  },
  glass: String,
  voteCount: Number,
});

module.exports = mongoose.model("Drink", drinkSchema);
