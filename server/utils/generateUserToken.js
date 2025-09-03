const jwt = require("jsonwebtoken");
const ms = require("ms");

const generateUserAccessToken = (userId) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

  return jwt.sign({ userId, tokenType: "user" }, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateUserRefreshToken = (userId) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

  return jwt.sign({ userId, tokenType: "user" }, REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

module.exports = { generateUserAccessToken, generateUserRefreshToken };
