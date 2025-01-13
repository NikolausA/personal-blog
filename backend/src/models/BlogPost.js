const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { User } = require("./User");

const BlogPost = sequelize.define(
  "BlogPost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING, // Хранение URL для медиа-контента (картинок, видео)
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

BlogPost.belongsTo(User, { foreignKey: "userId" });
User.hasMany(BlogPost, { foreignKey: "userId" });

module.exports = { BlogPost };
