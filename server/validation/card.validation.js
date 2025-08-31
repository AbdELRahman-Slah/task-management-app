const { body, param } = require("express-validator");
const checkListExist = require("../utils/validators/listExists.validator");

const getCardsValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),
];

const createAndUpdateCardValidation = () => [
  param("boardId").isMongoId().withMessage("Board ID is not valid"),

  body("listId")
    .isMongoId()
    .withMessage("List ID not Valid")
    .bail()
    .custom(checkListExist),

  body("title")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),

  body("description")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),

  body("coverImage")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),

  body("position")
    .optional()
    .notEmpty()
    .withMessage("Position is required")
    .isNumeric()
    .withMessage("Position must be a number"),

  body("labels").optional().isArray().withMessage("Label must be an array"),

  body("labels.*.title")
    .optional()
    .isString()
    .withMessage("Labels color must be a string")
    .notEmpty()
    .withMessage("Labels color cannot be empty"),

  body("labels.*.color")
    .optional()
    .isString()
    .withMessage("Labels color must be a string")
    .notEmpty()
    .withMessage("Labels color cannot be empty"),
];

const deleteCardValidation = () => [
  param("id").isMongoId().withMessage("Card ID is not valid"),
];

module.exports = {
  getCardsValidation,
  createAndUpdateCardValidation,
  deleteCardValidation,
};
