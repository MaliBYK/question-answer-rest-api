const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const register = asyncErrorWrapper(async (req, res, next) => {
  const name = "Muhammet Ali";
  const email = "mali124342gmail.com";
  const password = "123";

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

const errorTest = (req, res, next) => {
  return next(new TypeError("Type Error"));
};

module.exports = {
  register,
  errorTest,
};
