const { default: mongoose } = require("mongoose");
const catchWrapper = require("../middlewares/catchWrapper.middleware");
const Board = require("../models/board.model");
const AppError = require("../utils/AppError");

const getAllBoards = catchWrapper(async (req, res) => {
  const { userId } = req.user; // req.user was set in verifyUserToken.js file

  const boards = await Board.find({ "users.id": userId }, { __v: 0 });

  res.status(200).json({
    status: "success",
    data: { boards },
  });
});

const getBoardById = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;
  const { userId } = req.user; // req.user was set in verifyUserToken.js file

  const board = await Board.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(`${boardId}`),
        "users.id": new mongoose.Types.ObjectId(`${userId}`),
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "_id",
        foreignField: "boardId",
        as: "lists",
        pipeline: [
          {
            $lookup: {
              from: "cards",
              localField: "_id",
              foreignField: "listId",
              as: "cards",
            },
          },
        ],
      },
    },
  ]);

  if (!board.length) {
    return next(new AppError("Board doesn't exist", 404));
  }
  res.status(200).json({
    status: "success",
    data: { board },
  });
});

const createBoard = catchWrapper(async (req, res, next) => {
  const { title, users, icon, background } = req.body;
  const { userId } = req.user; // req.user was set in verifyUserToken.js file

  const filteredUsers = users.filter(
    ({ id }) => id.toString() !== userId.toString()
  );

  const newBoard = await Board.create({
    title,
    users: [
      {
        id: userId,
        role: "ADMIN", // Make the user that creates the board ADMIN by default
      },
      ...filteredUsers,
    ],
    icon,
    background,
  });

  res.status(201).json({
    status: "success",
    data: {
      board: newBoard,
    },
  });
});

const updateBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;
  const { title, users, icon } = req.body;
  const { userId } = req.user; // req.user was set in verifyUserToken.js file

  const board = await Board.findOne({ _id: boardId, "users.id": userId });

  if (!board) {
    return next(new AppError("Board doesn't exist", 404));
  }

  const userRole = board.users.find(
    ({ id }) => String(id) === String(userId)
  ).role;

  if (userRole !== "ADMIN") {
    return next(new AppError("Admins only can update the board", 403));
  }

  const filteredUsers = users.filter(
    ({ id }) => id.toString() !== userId.toString()
  );

  const updatedBoardQuery = await board.updateOne({
    title,
    users: [
      {
        id: userId,
        role: userRole,
      },
      ...filteredUsers,
    ],
    icon,
    background,
  });

  if (updatedBoardQuery.modifiedCount === 0)
    return next(new AppError("Board couldn't be updated"));

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const deleteBoard = catchWrapper(async (req, res, next) => {
  const boardId = req.params.id;
  const { userId } = req.user; // req.user was set in verifyUserToken.js file

  const board = await Board.findById(boardId);

  if (!board) {
    return next(new AppError("Board doesn't exist", 404));
  }

  const userInBoard = board.users.find(
    (user) => String(user.id) === userId && user.role === "ADMIN"
  );

  if (!userInBoard) {
    return next(new AppError("You are not an admin of this board", 403));
  }

  await Board.deleteOne({ _id: boardId });

  res.status(200).json({
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
