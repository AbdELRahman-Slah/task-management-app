const Board = require("../models/board.model");
const AppError = require("../utils/AppError");
const catchWrapper = require("./catchWrapper.middleware");

const validateBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.boardId;
  const { userId } = req.user;

  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    return next(new AppError("Board doesn't exist", 404));
  }

  const isUserExist = board.users.some(({ id }) => String(id) === userId);
  console.log(isUserExist);

  if (!isUserExist) {
    return next(new AppError("User doesn't exist in the board", 403));
  }

  next();
});

module.exports = validateBoard;
