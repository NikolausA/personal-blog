const multer = require("multer");
const { upload } = require("../services/fileUploadService");
const { BlogPost } = require("../models/BlogPost");
const { User } = require("../models/User");

// Создание записи блога
const createPost = async (req, res) => {
  const userId = req.user.id; // Идентификатор пользователя из middleware
  console.log("File received:", req.file);

  // Подключение middleware Multer для обработки файла
  upload.single("media")(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      // Другие ошибки
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    const { title, content } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null; // Путь к файлу

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
      return res
        .status(500)
        .json({ message: "Error creating blog post", error });
    }
  });
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

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByPk();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching blog posts", error });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Идентификатор пользователя из middleware

  // Подключение middleware Multer для обработки файла
  upload.single("media")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      // Поиск поста с автором
      const post = await BlogPost.findOne({
        where: { id, userId },
        include: [{ model: User, attributes: ["username"] }], // Получение имени автора
      });

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post not found or unauthorized" });
      }

      // Обновление данных
      const { title, content } = req.body;
      const mediaUrl = req.file
        ? `/uploads/${req.file.filename}`
        : post.mediaUrl; // Если новый файл не загружен, оставить старый

      post.title = title || post.title;
      post.content = content || post.content;
      post.mediaUrl = mediaUrl;

      await post.save();

      return res
        .status(200)
        .json({ message: "Post updated successfully", post });
    } catch (error) {
      return res.status(500).json({ message: "Error updating post", error });
    }
  });
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
  editPost,
  getPosts,
  deletePost,
};
