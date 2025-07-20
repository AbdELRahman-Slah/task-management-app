const jwt = require("jsonwebtoken");

const generateUserToken = (userId) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  return jwt.sign({ userId, tokenType: "user" }, JWT_SECRET, {
    algorithm: "HS256",
  });
};

module.exports = generateUserToken;
