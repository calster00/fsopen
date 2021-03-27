const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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

blogsRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findOne({ username: "root" });
    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
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

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    if (id === "all") {
      await Blog.deleteMany({});
    } else {
      await Blog.findByIdAndRemove(id);
    }
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
