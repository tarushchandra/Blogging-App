const JWT = require("jsonwebtoken");

const JWT_SECRET = "myJWTSecret";

const generateTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return JWT.sign(payload, JWT_SECRET);
};

const validateToken = (token) => {
  return JWT.verify(token, JWT_SECRET);
};

module.exports = { generateTokenForUser, validateToken };
