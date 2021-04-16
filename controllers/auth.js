const User = require("../models/User");

const register = async (req, res, next) => {
  const name = "Muhammet Ali";
  const email = "mali12@gmail.com";
  const password = "1234567";

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

const errorTest = (req, res, next) => {
  throw new Error("ERROR!");
};

module.exports = {
  register,
  errorTest,
};
