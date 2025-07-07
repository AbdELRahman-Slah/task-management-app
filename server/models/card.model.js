const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    title: String,
    description: String,
    coverImage: String,
    listId: { type: Schema.Types.ObjectId, ref: "List", require: true },
    position: Number,
    labels: [
      {
        title: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Card", cardSchema);
