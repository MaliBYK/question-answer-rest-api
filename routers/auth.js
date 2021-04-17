const express = require("express");
const router = express.Router();
const { register, tokenTest } = require("../controllers/auth");

router.post("/register", register);
router.post("/tokenTest", tokenTest);

module.exports = router;
