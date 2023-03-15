const Comment = require("../models/comment");

const handleCommentCreation = async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { handleCommentCreation };
