const express = require("express");
const {
  getAccessToRoute,
  answerOwnerAccess,
} = require("../middlewares/authorization/auth");
const router = express.Router({ mergeParams: true });
const {
  checkAnswerExists,
} = require("../middlewares/databases/databaseErrorHelpers");
const {
  addNewAnswer,
  getAllAnswers,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undolikeAnswer,
} = require("../controllers/answer");

router.post("/", getAccessToRoute, addNewAnswer);
router.get("/", getAllAnswers);
router.get("/:answer_id", checkAnswerExists, getSingleAnswer);
router.put(
  "/:answer_id/edit",
  [getAccessToRoute, checkAnswerExists, answerOwnerAccess],
  editAnswer
);
router.delete(
  "/:answer_id/delete",
  [getAccessToRoute, checkAnswerExists, answerOwnerAccess],
  deleteAnswer
);
router.get(
  "/:answer_id/like",
  [getAccessToRoute, checkAnswerExists],
  likeAnswer
);
router.get(
  "/:answer_id/undo_like",
  [getAccessToRoute, checkAnswerExists],
  undolikeAnswer
);
module.exports = router;
