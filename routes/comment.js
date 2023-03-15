const express = require("express");
const router = express.Router();
const { handleCommentCreation } = require("../controllers/comment");

router.post("/:blogId", handleCommentCreation);

module.exports = router;
