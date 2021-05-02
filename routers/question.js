const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const answer = require("./answer");
const Question = require("../models/Question");
const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");
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

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/:id",
  [
    checkQuestionExists,
    answerQueryMiddleware(Question, {
      population: [
        {
          path: "user",
          select: "name profile_image",
        },
        {
          path: "answers",
          select: "content",
        },
      ],
    }),
  ],
  getSingleQuestion
);
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
