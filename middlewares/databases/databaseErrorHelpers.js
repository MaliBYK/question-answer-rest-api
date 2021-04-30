const Question = require("../../models/Question");
const User = require("../../models/User");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const checkUserExists = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new CustomError("There is no such user with that ID"));

  next();
});

const checkQuestionExists = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);
  if (!question)
    return next(new CustomError("There is no such question with that ID"));

  next();
});

const checkAnswerExists = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id);
  if (!answer)
    return next(new CustomError("There is no such answer with that ID"));

  next();
});

module.exports = { checkUserExists, checkAnswerExists, checkQuestionExists };
