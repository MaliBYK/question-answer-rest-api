const express = require("express");
const dotenv = require("dotenv");
const app = express();
const routers = require("./routers");
dotenv.config({ path: "./config/env/config.env" });
const PORT = process.env.PORT;
const connectDatabase = require("./helpers/database/connectDatabase");

//* MongoDb Connection

connectDatabase();

//* Routers Middleware
app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`Server listening on port :${PORT}`);
});
