const catchWrapper = require("../middlewares/catchWrapper.middleware");
const Card = require("../models/card.model");
const AppError = require("../utils/AppError");

const createCard = catchWrapper(async (req, res, next) => {
  const { title, description, coverImage, position, labels } = req.body;
  const listId = req.params.listId;

  const createdCard = await Card.create({
    title,
    description,
    coverImage,
    listId,
    position,
    labels,
  });

  res.status(201).json({
    status: "success",
    data: { card: createdCard },
  });
});

const updateCard = catchWrapper(async (req, res, next) => {
  const { title, description, coverImage, position, labels } = req.body;
  const listId = req.params.listId;
  const cardId = req.params.id;

  const updatedCard = await Card.findOneAndUpdate(
    { _id: cardId },
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
  const listId = req.params.listId;

  const deletedCardQuery = await Card.deleteOne({ _id: cardId, listId });

  if (deletedCardQuery.deletedCount === 0) {
    return next(new AppError("Card doesn't exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createCard,
  updateCard,
  deleteCard,
};
