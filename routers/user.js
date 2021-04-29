const express = require("express");
const router = express.Router();
const {
  checkUserExists,
} = require("../middlewares/databases/databaseErrorHelpers");
const { getSingleUser, getAllUsers } = require("../controllers/user");

router.get("/:id", checkUserExists, getSingleUser);
router.get("/", getAllUsers);
module.exports = router;
