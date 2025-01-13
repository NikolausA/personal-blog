const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// Генерация JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Валидация JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Валидация и декодирование токена в middleware
const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Находим пользователя по ID из токена
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
