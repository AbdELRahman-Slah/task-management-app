const List = require("../models/list.model");
const AppError = require("../utils/AppError");
const catchWrapper = require("./catchWrapper.middleware");

const validateListInBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.boardId;
  const listId = req.body.listId;

  const list = await List.findOne({ _id: listId, boardId });

  if (!list) {
    return next(new AppError("List is not exist in this board", 404));
  }

  next();
});

module.exports = validateListInBoard;
