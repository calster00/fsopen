const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
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

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
