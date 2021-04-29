const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../models/User");

const blockUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  user.blocked = !user.blocked;
  user.save();

  res.status(200).json({
    success: true,
    message: "Process successfull",
  });
});

const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Successfully deleted the user",
  });
});

module.exports = { blockUser, deleteUser };
