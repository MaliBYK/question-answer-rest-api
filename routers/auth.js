const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { register, getUser, login } = require("../controllers/auth");

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);

module.exports = router;
