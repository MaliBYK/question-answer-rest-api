const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/validateUserInput");
const CustomError = require("../helpers/error/CustomError");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password))
    return next(new CustomError("Please check your inputs.", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new CustomError("Please check your credentials"), 400);
  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials"), 400);
  }
  sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout successfull",
    });
});

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Image Upload Successfull",
  });
});

module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
};
