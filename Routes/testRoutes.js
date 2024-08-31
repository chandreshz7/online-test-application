const express = require("express");
const {
  saveTestData,
  saveQuestionList,
  deleteQuestionList,
} = require("../controller/testConstroller");

const router = express.Router();

router.post("/save", saveTestData);

router.get("/fetchAll");

router.get("/getData/:id");

router.patch("/update/:id");

// delte multipal document of the questions..........
router.delete("/delete-questions", deleteQuestionList);

router.post("/saveQuestionLIst/:testID", saveQuestionList);

module.exports = router;
