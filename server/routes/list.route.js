const express = require("express");
const {
  getAllLists,
  createList,
  updateList,
  deleteList,
} = require("../controllers/list.controller");
const {
  getAndDeleteListValidation,
  createListValidation,
  updateListValidation,
} = require("../validation/list.validation");
const validate = require("../middlewares/validate.middleware");
const cardRouter = require("./card.route");
const verifyUserToken = require("../middlewares/verifyUserToken");
const validateBoard = require("../middlewares/validateBoard.middleware");

const listRouter = express.Router({ mergeParams: true });

listRouter.use("/:listId/cards", cardRouter);

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
    updateList
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
