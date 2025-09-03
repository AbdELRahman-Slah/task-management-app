const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Refresh token is required", 401));
  }

  try {
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    req.user = decode;

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired refresh token", 401));
  }
};

module.exports = verifyRefreshToken;
