const express = require("express");
const router = express.Router();
const { handleBlogRegistration } = require("../controllers/blog");
const { upload } = require("../services/upload");

router.post("/", upload.single("coverImage"), handleBlogRegistration);

module.exports = router;
