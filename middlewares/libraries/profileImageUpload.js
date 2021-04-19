const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const rootDir = path.dirname(require.main.filename);
    callback(null, path.join(rootDir, "/public/uploads"));
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split("/")[1];
    req.savedProfileImage = `image_${req.user.id}.${extension}`;
    callback(null, req.savedProfileImage);
  },
});
const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype))
    return callback(
      new CustomError("Please provide a valid image type", 400),
      false
    );

  return callback(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

module.exports = profileImageUpload;
