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
const verifyUserToken = require("../middlewares/verifyUserToken");
const validateBoard = require("../middlewares/validateBoard.middleware");

const listRouter = express.Router({ mergeParams: true });

listRouter
  .get(
    "/",
    getAndDeleteListValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    getAllLists
  )
  .post(
    "/",
    createListValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    createList
  )
  .patch(
    "/:id",
    updateListValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    updateOneList
  )
  .patch(
    "/",
    updateManyListsValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    updateManyLists
  )
  .delete(
    "/:id",
    getAndDeleteListValidation(),
    validate,
    verifyUserToken,
    validateBoard,
    deleteList
  );

module.exports = listRouter;
