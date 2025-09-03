const express = require("express");
const {
  createCard,
  updateCard,
  updateMultipleCards,
  deleteCard,
  getAllCardsForBoard,
  deleteMultipleCards,
} = require("../controllers/card.controller");
const {
  getCardsValidation,
  createAndUpdateCardValidation,
  updateMultipleCardsValidation,
  deleteCardValidation,
  deleteMultipleCardsValidation,
} = require("../validation/card.validation");
const validate = require("../middlewares/validate.middleware");
const validateListInBoard = require("../middlewares/validateListInBoard.middleware");
const validateBoard = require("../middlewares/validateBoard.middleware");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

const cardRouter = express.Router({ mergeParams: true });

cardRouter
  .get(
    "/",
    getCardsValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    getAllCardsForBoard
  )
  .post(
    "/",
    createAndUpdateCardValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    // validateListInBoard,
    createCard
  )
  .patch(
    "/:id",
    createAndUpdateCardValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    // validateListInBoard,
    updateCard
  )
  .patch(
    "/",
    updateMultipleCardsValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    // validateListInBoard,
    updateMultipleCards
  )
  .delete(
    "/:id",
    deleteCardValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    // validateListInBoard,
    deleteCard
  )
  .delete(
    "/",
    deleteMultipleCardsValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    // validateListInBoard,
    deleteMultipleCards
  );

module.exports = cardRouter;
