const express = require("express");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Создание нового поста
 *     description: Создает новый блог-пост. Требуется авторизация.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Заголовок поста
 *               content:
 *                 type: string
 *                 example: Текст поста.
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Загружаемый файл
 *     responses:
 *       201:
 *         description: Пост успешно создан
 *       400:
 *         description: Ошибка загрузки файла
 *       500:
 *         description: Ошибка сервера
 */
router.post("/create", authMiddleware, blogController.createPost);

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Получение списка постов
 *     description: Возвращает список всех постов с данными авторов.
 *     responses:
 *       200:
 *         description: Список постов
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", blogController.getPosts);

/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: Редактирование поста
 *     description: Обновляет блог-пост. Требуется авторизация.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               media:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Пост успешно обновлен
 *       404:
 *         description: Пост не найден или пользователь не авторизован
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", authMiddleware, blogController.editPost);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Удаление поста
 *     description: Удаляет блог-пост. Требуется авторизация.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Пост успешно удален
 *       404:
 *         description: Пост не найден или пользователь не авторизован
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, blogController.deletePost);

module.exports = router;
