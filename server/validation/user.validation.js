const { body } = require("express-validator");

const userRegisterValidation = () => {
  return [
    body("firstName")
      .isString()
      .withMessage("First name must be a string")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("First name is required"),
    body("lastName")
      .isString()
      .withMessage("Last name must be a string")
      .notEmpty()
      .withMessage("Last name is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not valid"),
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
      .isEmail()
      .withMessage("Email is not valid"),

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
