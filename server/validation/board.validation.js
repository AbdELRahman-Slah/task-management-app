const { header, param, body, check } = require("express-validator");
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

  body("admins")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Admins are required")
    .isArray({ min: 1 })
    .withMessage("Admins must be an array"),
  body("admins.*")
    .isMongoId()
    .withMessage("Admin ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("members") // TODO: Check if member is not an admin
    .optional()
    .isArray()
    .withMessage("Members must be an array"),
  body("members.*")
    .optional()
    .isMongoId()
    .withMessage("Member ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("icon").optional().isString().withMessage("Icon must be a string"),
];

const updateBoardValidation = () => [
  body("title")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("admins")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Admins are required")
    .isArray({ min: 1 })
    .withMessage("Admins must be an array"),
  body("admins.*")
    .optional()
    .isMongoId()
    .withMessage("Admin ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("members") // TODO: Check if member is not an admin
    .optional()
    .isArray()
    .withMessage("Members must be an array"),
  body("members.*")
    .optional()
    .isMongoId()
    .withMessage("Member ID is not valid")
    .bail()
    .custom(checkUserExists),

  body("icon").optional().isString().withMessage("Icon must be a string"),
];

module.exports = {
  getAndDeleteBoardByIdValidation,
  createBoardValidation,
  updateBoardValidation,
};
