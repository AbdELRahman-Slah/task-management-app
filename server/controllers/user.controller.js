const bcrypt = require("bcrypt");
const catchWrapper = require("../middlewares/catchWrapper.middleware");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const registerUser = catchWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const loginUser = catchWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(new AppError("User doesn't not exist", 404));
  }

  const passwordIsMatched = await bcrypt.compare(password, user.password);

  if (!passwordIsMatched) {
    next(new AppError("Password is incorrect", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};
