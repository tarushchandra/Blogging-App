const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  handleUserRegistration,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user");

router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
