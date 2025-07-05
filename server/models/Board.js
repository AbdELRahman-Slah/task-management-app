const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    icon: String,
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
