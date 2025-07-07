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

const listRouter = express.Router({ mergeParams: true });

listRouter
  .get("/", getAndDeleteListValidation(), validate, getAllLists)
  .post("/", createListValidation(), validate, createList)
  .put("/:id", updateListValidation(), validate, updateList)
  .delete("/:id", getAndDeleteListValidation(), validate, deleteList);

module.exports = listRouter;
