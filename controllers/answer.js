const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const addNewAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const informations = req.body;

  const answer = await Answer.create({
    ...informations,
    user: req.user.id,
    question: question_id,
  });

  answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const getAllAnswers = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const { answers } = await Question.findById(question_id).populate("answers");

  res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id);

  res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = {
  addNewAnswer,
  getAllAnswers,
  getSingleAnswer,
};
