const express = require("express");
const {
  createBoard,
  updateBoard,
  getBoardById,
  deleteBoard,
  getAllBoards,
} = require("../controllers/board.controller");
const {
  getAndDeleteBoardByIdValidation,
  createAndPutBoardValidation,
} = require("../validation/board.validation");
const validate = require("../middlewares/validate.middleware");

const boardRouter = express.Router();

boardRouter
  .get("/", getAllBoards)
  .get("/:id", getAndDeleteBoardByIdValidation(), validate, getBoardById)
  .post("/", createAndPutBoardValidation(), validate, createBoard)
  .put("/:id", createAndPutBoardValidation(), validate, updateBoard)
  .delete("/:id", getAndDeleteBoardByIdValidation(), validate, deleteBoard);

module.exports = boardRouter;
