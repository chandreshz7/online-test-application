const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
let app = express();
let port = process.env.PORT;

const dbConnect = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// dbConnect();

app.use("/user", require("./Routes/UserRoutes"));

app.use("/addTest", require("./Routes/testRoutes"));

app.use("/saveUserTestdata", require("./Routes/userTestResponse"));

app.listen(port);
