const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

// Static User Routes
// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Static Blog Routes
// Home Page
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("home", {
      user: req.user,
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add New Blog Page
router.get("/addBlog", (req, res) => {
  res.render("addBlog", { user: req.user });
});

// Rendering Individual Blog Page
router.get("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  console.log(blogId);
  try {
    const foundBlog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({ blogId }).populate("createdBy");
    res.render("blog", {
      blog: foundBlog,
      user: req.user,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
