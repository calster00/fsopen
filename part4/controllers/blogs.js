const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/api/blogs", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.post("/api/blogs", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
