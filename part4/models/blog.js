const { DataTypes } = require("sequelize");

const blog = (sequelize) => {
  const Blog = sequelize.define("blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User);
  };

  return Blog;
};

module.exports = blog;
