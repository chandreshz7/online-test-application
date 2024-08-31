const expressAsyncHandler = require("express-async-handler");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const saveUserController = expressAsyncHandler(async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const users = await user.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role,
  });

  if (users) {
    res.send(users);
  } else {
    console.log("it is here onlh");
    res.send("okkkk");
  }
});

const getUserListController = expressAsyncHandler(async (req, res) => {
  const users = await user.find();
  res.send(users);
});

const updateUserController = expressAsyncHandler(async (req, res) => {
  let id = req.params.id;
  let userobj = req.body;
  console.log("in hte updsate user controller", id, userobj);

  let updatedObj = await user.updateOne({ _id: id }, { $set: userobj });
  res.send(updatedObj);
});

const loginUserController = expressAsyncHandler(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let isUserValid = await user.find({ email: email });

  if (isUserValid.length) {
    if (isUserValid[0].password == password) {
      const accessToken = jwt.sign(
        {
          user: {
            username: isUserValid[0].username,
            email: isUserValid[0].email,
            id: isUserValid[0].id,
            role: isUserValid[0].role,
          },
        },
        "chandresh",
        { expiresIn: "15m" }
      );
      console.log("chandreshz", accessToken);

      res.send({ token: accessToken });
    } else {
      res.send({ message: "password is incorrect" });
    }
  } else {
    res.send("no user found with this emailId");
  }
});

module.exports = {
  saveUserController,
  getUserListController,
  updateUserController,
  loginUserController,
};
