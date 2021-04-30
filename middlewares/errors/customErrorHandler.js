const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  if (customError?.code === 11000)
    customError = new CustomError(
      "Duplicate Input Found : Check Yout Input",
      400
    );
  if (customError.name === "CastError") {
    customError = new CustomError("Please provide a valid ID", 400);
  }

  if (customError.name === "SyntaxError")
    customError = new CustomError("Unexpected syntax", 400);

  if (customError.name === "ValidationError")
    customError = new CustomError(err.message, 400);

  res.status(customError.statusCode || 500).json({
    success: false,
    error: customError.message,
  });
};

module.exports = customErrorHandler;
