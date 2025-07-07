const Board = require("../../models/board.model");

const checkBoardExists = async (boardId) => {
  const board = await Board.findById(boardId);

  if (!board) {
    return Promise.reject("Board ID doesn't exits");
  }

  return true;
};

module.exports = checkBoardExists;
