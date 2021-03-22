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

router.put("/api/blogs/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
      likes: request.body.likes,
    }, { new: true });
    response.status(200).json(updatedBlog);
  } catch (e) {
    next(e);
  }
});

router.delete("/api/blogs/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
