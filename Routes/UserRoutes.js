const express = require("express");
const {
  saveUserController,
  getUserListController,
  updateUserController,
  loginUserController,
} = require("../controller/saveUserController");

let router = express.Router();

router.post("/save", saveUserController);

router.get("/get", getUserListController);

router.patch("/update/:id", updateUserController);

router.get("/login", loginUserController);

module.exports = router;
