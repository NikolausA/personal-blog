const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Регистрация пользователя
router.post("/register", authController.register);

// Авторизация пользователя
router.post("/login", authController.login);

module.exports = router;
