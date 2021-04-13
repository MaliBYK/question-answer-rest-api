const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
  path: "./config/env/config.env",
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Question Answer Rest Api!");
});

app.listen(PORT, () => {
  console.log(
    `Server listening on port :${PORT} : ${process.env.NODE_ENV}
    `
  );
});
