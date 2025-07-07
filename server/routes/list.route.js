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

const listRouter = express.Router({ mergeParams: true });

listRouter.use("/:listId/cards", cardRouter);

listRouter
  .get("/", getAndDeleteListValidation(), validate, getAllLists)
  .post("/", createListValidation(), validate, createList)
  .put("/:id", updateListValidation(), validate, updateList)
  .delete("/:id", getAndDeleteListValidation(), validate, deleteList);

module.exports = listRouter;
