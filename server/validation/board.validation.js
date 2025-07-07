const { param, body } = require("express-validator");
const checkUserExists = require("../utils/validators/userExists.validator");

const getAndDeleteBoardByIdValidation = () => [
  param("id").isMongoId().withMessage("ID is not Valid"),
];

const createBoardValidation = () => [
  body("title")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("users")
    .isArray({ min: 1 })
    .withMessage("users must be an array of at least on element"),

  body("users.*.id")
    .isMongoId()
    .withMessage("user ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("users.*.role")
    .optional()
    .isIn(["ADMIN", "MEMBER"])
    .withMessage("Role is not valid"),

  body("icon").optional().isString().withMessage("Icon must be a string"),
];

const updateBoardValidation = () => [
  body("title")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("users")
    .optional()
    .isArray({ min: 1 })
    .withMessage("users must be an array of at least on element"),

  body("users.*.id")
    .optional()
    .isMongoId()
    .withMessage("user ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("users.*.role")
    .optional()
    .isIn(["ADMIN", "MEMBER"])
    .withMessage("Role is not valid"),

  body("icon").optional().isString().withMessage("Icon must be a string"),
];

module.exports = {
  getAndDeleteBoardByIdValidation,
  createBoardValidation,
  updateBoardValidation,
};
