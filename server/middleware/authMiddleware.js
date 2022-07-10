const jwt = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    req.tokenData = await jwt.verifyToken(req.headers.token);
    next();
  } catch (err) {
    res.status(405).json({ status: 405, msg: "you must to be login" });
  }
};
