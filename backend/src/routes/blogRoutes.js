const express = require("express");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Создание записи блога (защищено авторизацией)
router.post("/create", authMiddleware, blogController.createPost);

// Получение всех записей блога
router.get("/", blogController.getPosts);

router.put("/:id", authMiddleware, blogController.editPost);

// Удаление записи блога (защищено авторизацией)
router.delete("/:id", authMiddleware, blogController.deletePost);

module.exports = router;
