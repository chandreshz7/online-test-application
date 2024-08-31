let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questions = mongoose.Schema({
  testId: {
    type: String,
  },
  order: {
    type: Number,
    unique: true,
    require: true,
  },
  mark: {
    type: Number,
  },
  question: {
    type: String,
  },
  option_A: {
    _id: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new mongoose.Types.ObjectId();
      },
    },
    value: String,
    isAnswer: Boolean,
  },
  option_B: {
    _id: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new mongoose.Types.ObjectId();
      },
    },
    value: String,
    isAnswer: Boolean,
  },
  option_C: {
    _id: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new mongoose.Types.ObjectId();
      },
    },
    value: String,
    isAnswer: Boolean,
  },
  option_D: {
    _id: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new mongoose.Types.ObjectId();
      },
    },
    value: String,
    isAnswer: Boolean,
  },
});

module.exports = mongoose.model("questions", questions);
