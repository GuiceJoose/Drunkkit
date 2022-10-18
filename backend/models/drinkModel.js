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
  //   ingredients: [{ type: String }],
  //   instructions: {
  //     type: String,
  //     required: [true, "Please add instruction for making this drink"],
  //   },
  //   glass: String,
});

module.exports = mongoose.model("Drink", drinkSchema);
