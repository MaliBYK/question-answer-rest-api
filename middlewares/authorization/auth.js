const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
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

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

const getAdminAccess = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (user.role !== "admin")
    return next(new CustomError("Only Admins can access this route.", 403));

  next();
};

module.exports = { getAccessToRoute, getAdminAccess };
