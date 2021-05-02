const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");
const {
  checkUserExists,
} = require("../middlewares/databases/databaseErrorHelpers");
const { getSingleUser, getAllUsers } = require("../controllers/user");

router.get("/:id", checkUserExists, getSingleUser);
router.get("/", userQueryMiddleware(User), getAllUsers);
module.exports = router;
