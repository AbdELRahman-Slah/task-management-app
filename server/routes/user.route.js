const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../validation/user.validation");
const validate = require("../middlewares/validate.middleware");

const userRouter = express.Router();

userRouter
  .post("/register", userRegisterValidation(), validate, registerUser)
  .post("/login", userLoginValidation(), validate, loginUser);

module.exports = userRouter;
