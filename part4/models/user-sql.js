const { DataTypes } = require('sequelize');

const user = (sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 60],
      },
    },
    passwordHash: DataTypes.STRING(60),
  });

  User.associate = (models) => {
    User.hasMany(models.Blog);
  };

  return User;
};

module.exports = user;
