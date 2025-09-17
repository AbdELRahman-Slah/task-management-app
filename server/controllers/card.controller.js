const catchWrapper = require("../middlewares/catchWrapper.middleware");
const Card = require("../models/card.model");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

const getAllCardsForBoard = catchWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const cards = await Card.find({ boardId }).sort({ position: 1, listId: 1 });

  res.status(200).json({
    status: "success",
    data: {
      cards,
    },
  });
});

const createCard = catchWrapper(async (req, res, next) => {
  const { title, description, coverImage, position, labels, boardId, listId } =
    req.body;

  const createdCard = await Card.create({
    title,
    description,
    coverImage,
    listId,
    boardId,
    position,
    labels,
  });

  res.status(201).json({
    status: "success",
    data: { card: createdCard },
  });
});

const updateMultipleCards = catchWrapper(async (req, res, next) => {
  const { cards } = req.body;
  const { boardId } = req.params;

  if (!cards || cards.length === 0) {
    return res
      .status(400)
      .json({ status: "fail", message: "No cards provided" });
  }

  const operations = cards.map((card) => ({
    updateOne: {
      filter: {
        _id: card._id,
        boardId,
      },
      update: { $set: card },
    },
  }));

  await Card.bulkWrite(operations);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const updateCard = catchWrapper(async (req, res, next) => {
  const { title, description, coverImage, position, labels, listId } = req.body;
  const cardId = req.params.id;
  const { boardId } = req.params;

  const updatedCard = await Card.findOneAndUpdate(
    { _id: cardId, boardId },
    {
      title,
      description,
      coverImage,
      listId,
      position,
      labels,
    },
    { new: true }
  );

  if (!updatedCard) {
    return next(new AppError("Card doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: { card: updatedCard },
  });
});

const deleteCard = catchWrapper(async (req, res, next) => {
  const cardId = req.params.id;

  const deletedCardQuery = await Card.deleteOne({ _id: cardId });

  if (deletedCardQuery.deletedCount === 0) {
    return next(new AppError("Card doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const deleteMultipleCards = catchWrapper(async (req, res, next) => {
  const { cardIds } = req.body;
  const { boardId } = req.params;

  const deletedCardQuery = await Card.deleteMany({
    _id: { $in: cardIds },
    boardId,
  });

  if (deletedCardQuery.deletedCount === 0) {
    return next(new AppError("Cards don't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllCardsForBoard,
  createCard,
  updateCard,
  updateMultipleCards,
  deleteCard,
  deleteMultipleCards,
};
