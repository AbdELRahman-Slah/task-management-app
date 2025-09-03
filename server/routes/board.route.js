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
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const listRouter = require("./list.route");
const cardRouter = require("./card.route");

const boardRouter = express.Router();

boardRouter.use("/:boardId/lists", listRouter);
boardRouter.use("/:boardId/cards", cardRouter);

boardRouter
  .get("/", verifyAccessToken, getAllBoards)
  .get(
    "/:id",
    getAndDeleteBoardByIdValidation(),
    validate,
    verifyAccessToken,
    getBoardById
  )
  .post("/", createBoardValidation(), validate, verifyAccessToken, createBoard)
  .patch(
    "/:id",
    updateBoardValidation(),
    validate,
    verifyAccessToken,
    updateBoard
  )
  .delete(
    "/:id",
    getAndDeleteBoardByIdValidation(),
    validate,
    verifyAccessToken,
    deleteBoard
  );

module.exports = boardRouter;
