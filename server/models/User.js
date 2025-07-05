const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    LastName: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: String,
    BoardIds: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
