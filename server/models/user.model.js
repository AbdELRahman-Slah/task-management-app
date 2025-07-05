const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
