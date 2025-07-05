const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    title: String,
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    position: Number,
    color: String,
  },
  { timestamps: true }
);

module.exports = model("List", listSchema);
