const bcrypt = require("bcrypt");
const catchWrapper = require("../middlewares/catchWrapper.middleware");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const {
  generateUserAccessToken,
  generateUserRefreshToken,
} = require("../utils/generateUserToken");
const ms = require("ms");

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

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    },
  });
});

const loginUser = catchWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  const passwordIsMatched = await bcrypt.compare(password, user.password);

  if (!passwordIsMatched) {
    return next(new AppError("Password is incorrect", 401));
  }

  const accessToken = generateUserAccessToken(user._id);
  const refreshToken = generateUserRefreshToken(user._id);

  const accessTokenExpiresIn = ms(process.env.ACCESS_TOKEN_EXPIRES_IN);
  const refreshTokenExpiresIn = ms(process.env.REFRESH_TOKEN_EXPIRES_IN);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: accessTokenExpiresIn,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/api/users/refresh",
    maxAge: refreshTokenExpiresIn,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    },
  });
});

const getCurrentUser = catchWrapper(async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    },
  });
});

const refreshUserSession = catchWrapper(async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  const accessToken = generateUserAccessToken(user._id);
  const accessTokenExpiresIn = ms(process.env.ACCESS_TOKEN_EXPIRES_IN);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: accessTokenExpiresIn,
  });

  res.status(200).json({
    status: "success",
    data: null,
    message: "Access token is successfully updated",
  });
});

const logoutUser = catchWrapper(async (req, res, next) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/users/refresh" });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshUserSession,
  logoutUser,
};
