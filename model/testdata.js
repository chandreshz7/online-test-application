const mongoose = require("mongoose");

// const questionModel = require('../model/questions');
var Schema = mongoose.Schema;

// const questionModelRef = mongoose.model('questionModelRef', questionModel);
let testData = mongoose.Schema({
  TestName: {
    type: String,
  },
  // questionList:[{
  //     type: Schema.Types.ObjectId,
  //     ref: questionModelRef
  // }],
  SchedualDate: {
    type: Date,
  },
  metadata: [],
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("testData", testData);
