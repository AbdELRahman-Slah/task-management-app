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
const verifyUserToken = require("../middlewares/verifyUserToken");
const listRouter = require("./list.route");
const cardRouter = require("./card.route");

const boardRouter = express.Router();

boardRouter.use("/:boardId/lists", listRouter);
boardRouter.use("/:boardId/cards", cardRouter);

boardRouter
  .get("/", verifyUserToken, getAllBoards)
  .get(
    "/:id",
    getAndDeleteBoardByIdValidation(),
    validate,
    verifyUserToken,
    getBoardById
  )
  .post("/", createBoardValidation(), validate, verifyUserToken, createBoard)
  .patch(
    "/:id",
    updateBoardValidation(),
    validate,
    verifyUserToken,
    updateBoard
  )
  .delete(
    "/:id",
    getAndDeleteBoardByIdValidation(),
    validate,
    verifyUserToken,
    deleteBoard
  );

module.exports = boardRouter;
