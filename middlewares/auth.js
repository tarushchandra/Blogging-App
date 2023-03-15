const { validateToken } = require("../services/authentication");

function checkForAuthentication() {
  return function (req, res, next) {
    const token = req.cookies?.token;

    if (!token) return next();

    const user = validateToken(token);
    req.user = user;
    next();
  };
}

module.exports = { checkForAuthentication };
