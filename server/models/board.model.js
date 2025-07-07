const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    users: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        role: {
          type: String,
          enum: ["ADMIN", "MEMBER"],
          default: "MEMBER",
        },
      },
    ],
    icon: String,
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
