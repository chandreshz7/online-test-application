const mongoose = require("mongoose");

const answerkey = mongoose.Schema({
  testId: {
    type: String,
  },
  questionId: {
    type: String,
  },
  questionOrder: {
    type: Number,
  },
  correctAnsId: {
    type: String,
  },
});

module.exports = mongoose.model("answerkey", answerkey);
