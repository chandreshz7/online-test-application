const mongoose = require("mongoose");

let userResponseModel = mongoose.Schema({
  userId: {
    type: String,
  },
  testId: {
    type: String,
  },
  ansMap: {
    type: Map,
  },
  obtainedMarks: {
    type: Number,
  },
});

module.exports = mongoose.model("userResponseModel", userResponseModel);
