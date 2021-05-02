const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
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
  const answer = await Answer.findById(answer_id)
    .populate({
      path: "question",
      select: "title",
    })
    .populate({
      path: "user",
      select: "name profile_image",
    });

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const editAnswer = asyncErrorWrapper(async (req, res, next) => {
  const informations = req.body;
  const answer_id = req.params.answer_id;

  const answer = await Answer.findByIdAndUpdate(
    answer_id,
    { ...informations },
    { new: true, runValidators: true }
  );
  answer.save();
  res.status(200).json({
    success: true,
    data: answer,
  });
});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
  const answer_id = req.params.answer_id;
  const question_id = req.params.question_id;

  await Answer.findByIdAndRemove(answer_id);

  const question = await Question.findById(question_id);

  question.answers.splice(question.answers.indexOf(answer_id), 1);
  question.answerCount = question.answers.length;
  await question.save();

  res.status(200).json({
    success: true,
    message: "Answer deleted successfully",
  });
});

const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const user_id = req.user.id;
  const answer = await Answer.findById(answer_id);

  if (answer.likes.includes(user_id))
    return next(new CustomError("You already liked this answer", 400));

  answer.likes.push(user_id);
  await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const undolikeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const user_id = req.user.id;
  let answer = await Answer.findById(answer_id);

  if (!answer.likes.includes(user_id))
    return next(new CustomError("You have not liked this answer", 400));

  answer.likes.splice(answer.likes.indexOf(user_id), 1);
  answer = await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = {
  addNewAnswer,
  getAllAnswers,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undolikeAnswer,
};
