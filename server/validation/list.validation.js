const { param, body } = require("express-validator");

const getAndDeleteListValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),
];

const createListValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty"),

  body("position")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Position is required")
    .isNumeric()
    .withMessage("Position must be a number"),

  body("color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Color cannot be empty"),
];

const updateListValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),

  param("id").isMongoId().withMessage("List ID is not valid"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty"),

  body("position")
    .optional()
    .isNumeric()
    .withMessage("Position must be a number")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Position cannot be empty"),

  body("color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Color cannot be empty"),
];

const updateManyListsValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),

  body("lists").isArray().withMessage("Lists must be an array"),

  body("lists.*._id").isMongoId().withMessage("List ID is not valid"),

  body("lists.*.title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty"),

  body("lists.*.position")
    .optional()
    .isNumeric()
    .withMessage("Position must be a number")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Position cannot be empty"),

  body("lists.*.color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Color cannot be empty"),
];

module.exports = {
  getAndDeleteListValidation,
  createListValidation,
  updateListValidation,
  updateManyListsValidation,
};
