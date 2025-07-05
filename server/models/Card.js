const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    title: String,
    description: String,
    coverImage: String,
    list: { type: Schema.Types.ObjectId, ref: "List" },
    position: Number,
    label: [
      {
        title: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Card", cardSchema);
