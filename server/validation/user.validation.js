const { body } = require("express-validator");

const userRegisterValidation = () => {
  return [
    body("firstName")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName").isString().notEmpty().withMessage("Last name is required"),
    body("email")
      .notEmpty()
      .isString()
      .isEmail()
      .withMessage("Email is required"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ];
};
const userLoginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .withMessage("Email must be valid"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ];
};

module.exports = { userRegisterValidation, userLoginValidation };
