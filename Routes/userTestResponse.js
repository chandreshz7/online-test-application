const express = require("express");
const {
  saveUserTestResponse,
  saveObtainedMarks
} = require("../controller/saveUserTestResponseController");
let router = express.Router();

router.post("/save", saveUserTestResponse);


router.post("/saveObtainedMarks", saveObtainedMarks);


module.exports = router;
