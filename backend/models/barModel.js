const mongoose = require("mongoose");

const barSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [{ type: String }],
});

module.exports = mongoose.model("Bar", barSchema);
