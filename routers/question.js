const express = require("express");
const router = express.Router();
const answer = require("./answer");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undolikeQuestion,
} = require("../controllers/question");
const {
  getAccessToRoute,
  questionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExists,
} = require("../middlewares/databases/databaseErrorHelpers");

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExists, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExists, questionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExists, questionOwnerAccess],
  deleteQuestion
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExists],
  undolikeQuestion
);

router.use("/:question_id/answers", checkQuestionExists, answer);

module.exports = router;
