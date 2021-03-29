const { Sequelize } = require("sequelize");
const user = require("./user");
const blog = require("./blog");

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const models = {
  User: user(sequelize),
  Blog: blog(sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models,
};
