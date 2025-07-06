const express = require("express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const boardRouter = require("./routes/board.route");

const app = express();
const httpSever = createServer(app);

app.use(express.json());
app.use("/users", userRouter);
app.use("/api/boards", boardRouter);

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

connectDB()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(MONGODB_URI);
}

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "fail",
    message: error.message || "Something went wrong!",
    data: null,
  });
});

httpSever.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
