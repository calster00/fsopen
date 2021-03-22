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

router.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = router;
