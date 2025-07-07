const catchWrapper = require("../middlewares/catchWrapper.middleware");
const List = require("../models/list.model");
const AppError = require("../utils/AppError");

const getAllLists = catchWrapper(async (req, res, next) => {
  const boardId = req.params.boardId;

  // TODO: Check if they are member of that board or not

  const lists = await List.find({ boardId });

  res.status(200).json({
    status: "success",
    data: lists,
  });
});

const createList = catchWrapper(async (req, res, next) => {
  const { title, position, color } = req.body;
  const boardId = req.params.boardId;

  const newList = await List.create({ title, boardId, position, color });

  res.status(201).json({
    status: "success",
    data: newList,
  });
});

const updateList = catchWrapper(async (req, res, next) => {
  const { title, position, color } = req.body;
  const boardId = req.params.boardId;
  const listId = req.params.id;

  const updatedList = await List.findOneAndUpdate(
    { _id: listId },
    { title, boardId, position, color },
    { new: true }
  );

  if (!updatedList) {
    return next(new AppError("List doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedList,
  });
});

const deleteList = catchWrapper(async (req, res, next) => {
  const listId = req.params.id;

  const deletedListQuery = await List.deleteOne({ _id: listId });

  if (deletedListQuery.deletedCount === 0) {
    return next(new AppError("List doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllLists,
  createList,
  updateList,
  deleteList,
};
