const express = require("express");
const {
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/card.controller");
const {
  createAndUpdateCardValidation,
  deleteCardValidation,
} = require("../validation/card.validation");
const validate = require("../middlewares/validate.middleware");
const validateListInBoard = require("../middlewares/validateListInBoard.middleware");

const cardRouter = express.Router({ mergeParams: true });

cardRouter
  .post(
    "/",
    createAndUpdateCardValidation(),
    validate,
    validateListInBoard,
    createCard
  )
  .patch(
    "/:id",
    createAndUpdateCardValidation(),
    validate,
    validateListInBoard,
    updateCard
  )
  .delete(
    "/:id",
    deleteCardValidation(),
    validate,
    validateListInBoard,
    deleteCard
  );

module.exports = cardRouter;
