const { User } = require("../models/User");
const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");

/**
 * Регистрирует нового пользователя.
 * @param {Object} req - Объект запроса Express
 * @param {Object} req.body - Данные для регистрации
 * @param {string} req.body.username - Имя пользователя
 * @param {string} req.body.email - Email пользователя
 * @param {string} req.body.password - Пароль пользователя
 * @param {Object} res - Объект ответа Express
 */
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.generateToken({ id: newUser.id });

    return res.status(201).json({
      message: "User registered successfully",
      id: newUser.id,
      username: newUser.username,
      redirect: true,
      redirectUrl: "/",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
};

/**
 * Аутентифицирует пользователя.
 * @param {Object} req - Объект запроса Express
 * @param {Object} req.body - Данные для входа
 * @param {string} req.body.email - Email пользователя
 * @param {string} req.body.password - Пароль пользователя
 * @param {Object} res - Объект ответа Express
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.generateToken({ id: user.id });

    return res.status(200).json({
      message: "Login successful",
      token,
      id: user.id,
      username: user.username,
      redirect: true,
      redirectUrl: "/",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {
  register,
  login,
};
