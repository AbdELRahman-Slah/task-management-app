const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const verifyAccessToken = (req, res, next) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return next(new AppError("Access token is required", 401));
  }

  try {
    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {});
    req.user = decode;

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = verifyAccessToken;
