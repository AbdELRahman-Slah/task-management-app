const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    title: String,
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    position: Number, // TODO: Position should to be unique in specific board
    color: String,
  },
  { timestamps: true }
);

module.exports = model("List", listSchema);
