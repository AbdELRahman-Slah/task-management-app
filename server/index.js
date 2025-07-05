const express = require("express");
const { createServer } = require("http");

const app = express();
const httpSever = createServer(app);

require("dotenv").config();

const PORT = process.env.PORT || 3000;

httpSever.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
