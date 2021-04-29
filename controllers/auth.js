const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/validateUserInput");
const CustomError = require("../helpers/error/CustomError");
const sendEmail = require("../helpers/libraries/sendEmail");

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
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image Upload Successfull",
    data: user,
  });
});

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;
  if (!resetEmail)
    return next(new CustomError("Please provide the email address!"), 400);

  const user = await User.findOne({ email: resetEmail });
  if (!user)
    return next(new CustomError("Please provide a valid email address!"), 400);

  user.getResetPasswordTokenFromUser();

  user.save();

  const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${user.resetPasswordToken}`;

  const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p>Click <a href="${resetPasswordUrl}">this link</a> to reset your password.</p>
    <p> This link will expire in 1 hour ! </p>
  `;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset Your Password",
      html: emailTemplate,
    });

    res.status(200).json({
      success: true,
      message: "Token successfully sent to your email address",
    });
  } catch {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError("Email Could Not Be Sent", 500));
  }
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPasswordToken)
    return next(new CustomError("Please provide a valid token", 400));

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new CustomError("Invalid token or seccion expired", 400));

  user.password = password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  user.save();

  res.status(200).json({
    success: true,
    message: "Password succesfully changed",
  });
});

const editDetails = asyncErrorWrapper(async (req, res, next) => {
  const editInformations = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, editInformations, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
};
