const { BlogPost } = require("../models/BlogPost");
const { User } = require("../models/User");

// Создание записи блога
const createPost = async (req, res) => {
  const { title, content, mediaUrl } = req.body;
  const userId = req.user.id; // Идентификатор пользователя из middleware

  try {
    const newPost = await BlogPost.create({
      title,
      content,
      mediaUrl,
      userId,
    });

    return res
      .status(201)
      .json({ message: "Blog post created successfully", post: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog post", error });
  }
};

// Получение всех записей блога
const getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, attributes: ["username", "email"] }],
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching blog posts", error });
  }
};

// Удаление записи блога
const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Идентификатор пользователя из middleware

  try {
    const post = await BlogPost.findOne({ where: { id, userId } });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    await post.destroy();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
};
