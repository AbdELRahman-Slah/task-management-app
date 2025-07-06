const catchWrapper = require("../middlewares/catchWrapper.middleware");
const Board = require("../models/board.model");
const AppError = require("../utils/AppError");

const getAllBoards = catchWrapper(async (req, res) => {
  //TODO: Get UserId from JWT To Filter Boards

  const boards = await Board.find({}, { __v: 0 });

  res.status(200).json({
    status: "success",
    data: boards,
  });
});

const getBoardById = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;

  const board = await Board.findById(boardId, { __v: 0 });

  if (!board) {
    next(new AppError("Board doesn't exist"));
  }

  res.status(200).json({
    status: "success",
    data: board,
  });
});

const createBoard = catchWrapper(async (req, res) => {
  const { title, admins, members, icon } = req.body;

  const newBoard = await Board.create({
    title,
    admins,
    members,
    icon,
  });

  res.status(201).json({
    status: "success",
    data: newBoard,
  });
});

const updateBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;
  const { title, admins, members, icon } = req.body;

  const updatedBoard = await Board.findOneAndUpdate(
    { _id: boardId },
    {
      title,
      admins,
      members,
      icon,
    },
    {
      new: true,
    }
  );

  if (!updatedBoard) {
    next(new AppError("Board doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedBoard,
  });
});

const deleteBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;

  const deletedBoard = await Board.deleteOne({ _id: boardId });

  if (deletedBoard.deletedCount == 0) {
    next(new AppError("Board doesn't exist", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
