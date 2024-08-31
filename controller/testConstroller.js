const expressAsyncHandler = require("express-async-handler");
const testData = require("../model/testdata");
const questions = require("../model/questions");

const saveTestData = expressAsyncHandler(async (req, res) => {
  let test_data = req.body;
  console.log("test data inthe req. body", test_data);
  let savedTestData = await testData.create(test_data);

  if (savedTestData) {
    res.send(savedTestData);
  } else {
    return res.status(400).send({
      message: "Failed to save test data!",
    });
  }
});

const getTestData = expressAsyncHandler(async (req, res) => {});

const saveQuestionList = expressAsyncHandler(async (req, res) => {
  var listOfQuestions = req.body;
  listOfQuestions.forEach((data) => {
    data["testId"] = req.params.testID;
  });

  // const questionList = new questions.insertMany(listOfQuestions);
  console.log("listOf questions ", listOfQuestions);
  const questionList = await questions.insertMany(listOfQuestions);

  if (questionList) {
    res.send({ message: "saved documents succesfully...." });
  } else {
    res.status(500).send({ message: "Failed to save the data in the db." });
  }
});

const deleteQuestionList = expressAsyncHandler(async (req, res) => {
  let listofQuestion = req.body;
  const deletedDocument = await questions.deleteMany(listofQuestion);

  if (deletedDocument) {
    res.status(200).send({ message: "document deleted succesfully..." });
  } else {
    res.status(500).send({ message: "Error while deleteing documents..." });
  }
});

module.exports = {
  saveTestData,
  getTestData,
  saveQuestionList,
  deleteQuestionList,
};
