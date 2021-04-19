const express = require("express");
const dotenv = require("dotenv");
const app = express();
const routers = require("./routers");
dotenv.config({ path: "./config/env/config.env" });
const PORT = process.env.PORT;
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");

//* MongoDb Connection

connectDatabase();

app.use(express.json());

//* Routers Middleware
app.use("/api", routers);

//* Static files
app.use(express.static(path.join(__dirname, "public")));

//!Error Handler
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port :${PORT}`);
});
