const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const multer = require("multer");

const feedRoutes = require("./routes/feed");

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//PARSE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PUBLIC
app.use("/images", express.static(path.join(__dirname, "images")));

//ROUTES
app.use("/feed", feedRoutes);

//MIDDLEWARE ERROR
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errores = error.errorDetails || null;

  console.log("📤 Respuesta enviada al frontend:", {
    status,
    message,
    errores,
  });
  res.status(status).json({ message: message, erroresBack: errores });
});

mongoose.connect(process.env.MONGODB_URI).then((result) => {
  app.listen(8080);
  console.log("Connected to database!");
});
