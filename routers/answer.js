const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router({ mergeParams: true });
const {
  checkAnswerExists,
} = require("../middlewares/databases/databaseErrorHelpers");
const {
  addNewAnswer,
  getAllAnswers,
  getSingleAnswer,
} = require("../controllers/answer");

router.post("/", getAccessToRoute, addNewAnswer);
router.get("/", getAllAnswers);
router.get("/:answer_id", checkAnswerExists, getSingleAnswer);
module.exports = router;
