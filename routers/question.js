const express = require("express");
const router = express.Router();
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controllers/question");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkQuestionExists,
} = require("../middlewares/databases/databaseErrorHelpers");

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExists, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);

module.exports = router;
