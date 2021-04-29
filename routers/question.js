const express = require("express");
const router = express.Router();
const { askNewQuestion } = require("../controllers/question");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.post("/ask", getAccessToRoute, askNewQuestion);

module.exports = router;
