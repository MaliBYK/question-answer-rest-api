const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });

  question.save();
  res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  res.status(200).json(res.queryResult);
});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id).populate("answers");

  res.status(200).json(res.queryResult);
});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const informations = req.body;
  let question = await Question.findByIdAndUpdate(
    id,
    {
      ...informations,
    },
    { new: true, runValidators: true }
  );

  question = await question.save();
  res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.user.id;

  let question = await Question.findById(questionId);

  if (question.likes.includes(userId))
    return next(new CustomError("You already liked this question", 400));

  question.likes.push(userId);
  question.likeCount = question.likes.length;
  question = await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

const undolikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.user.id;

  let question = await Question.findById(questionId);

  if (!question.likes.includes(userId))
    return next(
      new CustomError("You cannot unde like operation for this question.", 400)
    );

  const index = question.likes.indexOf(userId);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;
  question = await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undolikeQuestion,
};
