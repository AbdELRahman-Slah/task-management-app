const express = require("express");
const {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} = require("../controllers/user.controller");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../validation/user.validation");
const validate = require("../middlewares/validate.middleware");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

const userRouter = express.Router();

userRouter
  .post("/register", userRegisterValidation(), validate, registerUser)
  .post("/login", userLoginValidation(), validate, loginUser)
  .post("/refresh", verifyRefreshToken, refreshUserSession)
  .post("/logout", logoutUser);

module.exports = userRouter;
