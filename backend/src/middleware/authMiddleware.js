const { decodeToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  // Получаем токен из заголовков авторизации
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Проверяем токен и получаем пользователя
  const user = await decodeToken(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Добавляем пользователя в запрос, чтобы он был доступен в контроллере
  req.user = user;

  // Даем продолжить выполнение запроса
  next();
};

module.exports = authMiddleware;
