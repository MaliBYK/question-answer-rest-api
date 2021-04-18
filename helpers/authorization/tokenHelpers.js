const sendJwtToClient = (user, res) => {
  const token = user.generateJwtFromUser();
  res
    .status(200)
    .cookie("access_token", token, {
      expires: new Date(
        Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 1000 * 60
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

const isTokenInclueded = req =>
  req.headers.authorization && req.headers.authorization.startsWith("Bearer:");

const getTokenFromHeader = req => req.headers.authorization.split(" ")[1];

module.exports = { sendJwtToClient, isTokenInclueded, getTokenFromHeader };
