const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");
const asyncErrorWrapper = require("express-async-handler");
const {
  isTokenInclueded,
  getTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = asyncErrorWrapper(async (req, res, next) => {
  if (!isTokenInclueded(req)) {
    return next(
      new CustomError("You are not authorized to access this route!", 401)
    );
  }
  const accessToken = getTokenFromHeader(req);

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route!", 401)
      );
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
});

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (user.role !== "admin")
    return next(new CustomError("Only Admins can access this route.", 403));

  next();
});

const questionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);
  if (question.user != userId)
    return next(new CustomError("Only owner can handle this operation!", 403));

  next();
});

const checkAnswerExists = asyncErrorWrapper(async (req, res, next) => {
  const answer_id = req.params.answer_id;

  const answer = Answer.findById(answer_id);

  if (!answer)
    return next(new CustomError("There is no such answer with that id", 404));

  next();
});

const answerOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const answer_id = req.params.answer_id;
  const { user } = await Answer.findById(answer_id);
  if (user != req.user.id)
    return next(new CustomError("Only owner can access to this route", 403));

  next();
});

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  questionOwnerAccess,
  answerOwnerAccess,
};
