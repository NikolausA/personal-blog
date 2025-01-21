require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uploadPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadPath));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send(`Backend is running! Path to uploads dir: ${uploadPath}`);
});

module.exports = app;
