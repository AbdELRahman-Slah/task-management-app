const { default: mongoose } = require("mongoose");
const catchWrapper = require("../middlewares/catchWrapper.middleware");
const List = require("../models/list.model");
const AppError = require("../utils/AppError");

const getAllLists = catchWrapper(async (req, res, next) => {
  const boardId = req.params.boardId;

  const lists = await List.aggregate([
    { $match: { boardId: new mongoose.Types.ObjectId(`${boardId}`) } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
      },
    },
  ]).sort({ position: 1 });

  res.status(200).json({
    status: "success",
    data: { lists },
  });
});

const createList = catchWrapper(async (req, res, next) => {
  const { title, position, color } = req.body;
  const boardId = req.params.boardId;

  const newList = await List.create({ title, boardId, position, color });

  res.status(201).json({
    status: "success",
    data: { list: newList },
  });
});

const updateOneList = catchWrapper(async (req, res, next) => {
  const { title, position, color } = req.body;
  const boardId = req.params.boardId;
  const listId = req.params.id;

  const updatedList = await List.findOneAndUpdate(
    { _id: listId, boardId },
    { title, position, color },
    { new: true }
  );

  if (!updatedList) {
    return next(new AppError("List doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: { list: updatedList },
  });
});

const updateManyLists = catchWrapper(async (req, res, next) => {
  const { lists } = req.body;
  const boardId = req.params.boardId;

  const operations = lists.map((list) => ({
    updateOne: {
      filter: { _id: list._id, boardId },
      update: { $set: { position: Number(list.position) } },
    },
  }));

  await List.bulkWrite(operations);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const deleteList = catchWrapper(async (req, res, next) => {
  const boardId = req.params.boardId;
  const listId = req.params.id;

  const deletedListQuery = await List.deleteOne({ _id: listId, boardId });

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
  updateOneList,
  updateManyLists,
  deleteList,
};
