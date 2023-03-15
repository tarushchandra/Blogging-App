const Blog = require("../models/blog");

const handleBlogRegistration = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({
      title,
      content,
      coverImageURL: `/uploads/${req.file.filename}`,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (err) {
    return res.redirect("/addBlog");
  }
};

module.exports = { handleBlogRegistration };
