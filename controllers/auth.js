const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");

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

const tokenTest = (req, res, next) => {
  res.json({
    success: true,
    data: "Welcome",
  });
};

module.exports = {
  register,
  tokenTest,
};
