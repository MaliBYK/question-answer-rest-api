const express = require("express");
const router = express.Router();
const {
  checkUserExists,
} = require("../middlewares/databases/databaseErrorHelpers");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const { blockUser, deleteUser } = require("../controllers/admin");

router.use([getAccessToRoute, getAdminAccess]);
router.get("/block/:id", checkUserExists, blockUser);
router.delete("/delete/:id", checkUserExists, deleteUser);
module.exports = router;
