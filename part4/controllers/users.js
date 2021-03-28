const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const {
  models: { User: UserSQL, Blog: BlogSQL },
} = require("../models/index");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const existingUser = await UserSQL.findOne({ where: { username } });

    if (existingUser) {
      return response.status(409).send({ error: "Username already exists" });
    }
    if (password.length < 3) {
      return response
        .status(400)
        .send({ error: "A password should have at least 3 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await UserSQL.create({
      username,
      name,
      passwordHash,
    });

    response
      .status(201)
      .json({
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash,
      });
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await UserSQL.findAll({
      attributes: ["username", "name", "id"],
      include: [
        { model: BlogSQL, attributes: ["title", "author", "url", "id"] },
      ],
    });
    response.json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
