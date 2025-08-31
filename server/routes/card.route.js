const express = require("express");
const {
  createCard,
  updateCard,
  deleteCard,
  getAllCardsForBoard,
} = require("../controllers/card.controller");
const {
  getCardsValidation,
  createAndUpdateCardValidation,
  deleteCardValidation,
} = require("../validation/card.validation");
const validate = require("../middlewares/validate.middleware");
const validateListInBoard = require("../middlewares/validateListInBoard.middleware");
const validateBoard = require("../middlewares/validateBoard.middleware");
const verifyUserToken = require("../middlewares/verifyUserToken");

const cardRouter = express.Router({ mergeParams: true });

cardRouter
  .get(
    "/",
    getCardsValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    getAllCardsForBoard
  )
  .post(
    "/",
    createAndUpdateCardValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    validateListInBoard,
    createCard
  )
  .patch(
    "/:id",
    createAndUpdateCardValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    validateListInBoard,
    updateCard
  )
  .delete(
    "/:id",
    deleteCardValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    // validateListInBoard,
    deleteCard
  );

module.exports = cardRouter;
