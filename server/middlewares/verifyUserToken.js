const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const verifyUserToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("Authorization header is missing or malformed", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET, {});
    req.user = decode;

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = verifyUserToken;
