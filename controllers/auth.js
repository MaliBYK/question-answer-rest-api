const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const createJwtFromUser = require("../helpers/authorization/createJwtFromUser");
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  createJwtFromUser(user, res);
});

module.exports = {
  register,
};
