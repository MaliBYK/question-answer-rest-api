const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
} = require("../controllers/auth");

const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);
router.post("/login", login);
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/forgotpassword", forgotPassword);
module.exports = router;
