const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: request.body.likes,
      },
      { new: true }
    );
    response.status(200).json(updatedBlog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = request.user;
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).send({ error: "blog not found" });
    }

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(id);
    } else {
      return response.status(401).end();
    }

    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
