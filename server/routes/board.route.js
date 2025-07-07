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
  createBoardValidation,
  updateBoardValidation,
} = require("../validation/board.validation");
const validate = require("../middlewares/validate.middleware");
const listRouter = require("./list.route");

const boardRouter = express.Router();

boardRouter.use("/:boardId/lists", listRouter);

boardRouter
  .get("/", getAllBoards)
  .get("/:id", getAndDeleteBoardByIdValidation(), validate, getBoardById)
  .post("/", createBoardValidation(), validate, createBoard)
  .patch("/:id", updateBoardValidation(), validate, updateBoard)
  .delete("/:id", getAndDeleteBoardByIdValidation(), validate, deleteBoard);

module.exports = boardRouter;
