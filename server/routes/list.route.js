const express = require("express");
const {
  getAllLists,
  createList,
  updateOneList,
  updateManyLists,
  deleteList,
} = require("../controllers/list.controller");
const {
  getAndDeleteListValidation,
  createListValidation,
  updateListValidation,
  updateManyListsValidation,
} = require("../validation/list.validation");
const validate = require("../middlewares/validate.middleware");
const cardRouter = require("./card.route");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const validateBoard = require("../middlewares/validateBoard.middleware");

const listRouter = express.Router({ mergeParams: true });

listRouter
  .get(
    "/",
    getAndDeleteListValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    getAllLists
  )
  .post(
    "/",
    createListValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    createList
  )
  .patch(
    "/:id",
    updateListValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    updateOneList
  )
  .patch(
    "/",
    updateManyListsValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    updateManyLists
  )
  .delete(
    "/:id",
    getAndDeleteListValidation(),
    validate,
    verifyAccessToken,
    validateBoard,
    deleteList
  );

module.exports = listRouter;
