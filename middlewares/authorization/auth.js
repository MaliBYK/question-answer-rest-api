const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenInclueded,
  getTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
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
    console.log(decoded);
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

module.exports = { getAccessToRoute };
