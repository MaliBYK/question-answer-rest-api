const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { register, tokenTest } = require("../controllers/auth");

router.post("/register", register);
router.post("/tokenTest", getAccessToRoute, tokenTest);

module.exports = router;
