const User = require("../models/user");

// Registration
const handleUserRegistration = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    res.redirect("/login");
  }
};

// Logout
const handleUserLogout = async (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = { handleUserRegistration, handleUserLogin, handleUserLogout };
