const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя с указанными данными.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: James
 *               email:
 *                 type: string
 *                 example: j@mail.ru
 *               password:
 *                 type: string
 *                 example: securePass1#
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: James
 *                 redirect:
 *                   type: boolean
 *                   example: true
 *                 redirectUrl:
 *                   type: string
 *                   example: /
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Пользователь с таким email уже существует
 *       500:
 *         description: Ошибка регистрации пользователя
 */

router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход в систему
 *     description: Аутентификация пользователя с проверкой email и пароля.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: j@mail.ru
 *               password:
 *                 type: string
 *                 example: securePass1#
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: James
 *                 redirect:
 *                   type: boolean
 *                   example: true
 *                 redirectUrl:
 *                   type: string
 *                   example: /
 *       401:
 *         description: Неверные учетные данные
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка аутентификации
 */

router.post("/login", authController.login);

module.exports = router;
