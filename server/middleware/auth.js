
const { verifyTokenUser } = require("../config/jwt");

function authorizationMiddlware(req, res, next) {
  const tokenFromClient = req.header("x-auth-token");

  if (!tokenFromClient) {
    console.log(
      "Authorization Error: User did not sent token!"
    );
    return res.status(401).json("Please Login");
  }
  const userInfo = verifyTokenUser(tokenFromClient);

  if (!userInfo) {
    console.log("Authorization Error: Invalid Token!");
    return res.status(401).json("Invalid  Token!");
  }

  req.user = userInfo;

  return next();
}

module.exports = authorizationMiddlware;
