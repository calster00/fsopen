const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");
const {
  models: { User: UserSQL, Blog: BlogSQL },
} = require("../models/index");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await BlogSQL.findAll({
      attributes: ["id", "title", "author", "url", "likes"],
      include: [{ model: UserSQL, attributes: ["username", "name", "id"] }],
    });
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const blog = await BlogSQL.create({
      ...request.body,
      userId: request.user.id,
    });
    response.status(201).json(blog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  try {
    const updatedBlog = await BlogSQL.update(
      { likes: request.body.likes },
      {
        where: { id: request.params.id },
        returning: true,
      }
    );
    response.status(200).json(updatedBlog[1][0]);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = request.user;
    const blog = await BlogSQL.findByPk(id);

    if (!blog) {
      return response.status(404).send({ error: "blog not found" });
    }

    if (blog.userId.toString() === user.id.toString()) {
      await BlogSQL.destroy({ where: { id } });
    } else {
      return response.status(401).end();
    }

    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
