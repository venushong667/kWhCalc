const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  watt: Number,
  time: String
});

module.exports = mongoose.model("Data", dataSchema);
