const bcrypt = require("bcrypt");
const catchWrapper = require("../middlewares/catchWrapper.middleware");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const generateUserToken = require("../utils/generateUserToken");

const registerUser = catchWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = generateUserToken(newUser._id);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
    },
  });
});

const loginUser = catchWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User doesn't not exist", 404));
  }

  const passwordIsMatched = await bcrypt.compare(password, user.password);

  if (!passwordIsMatched) {
    return next(new AppError("Password is incorrect", 401));
  }

  const token = generateUserToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};
