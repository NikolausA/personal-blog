require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

module.exports = app;
