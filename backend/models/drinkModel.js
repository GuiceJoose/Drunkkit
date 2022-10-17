const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
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
