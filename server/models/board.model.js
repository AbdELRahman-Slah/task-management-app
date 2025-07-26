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
    background: {
      type: String,
      default: "bg-gradient-to-br from-purple-400 to-pink-400",
    },
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
