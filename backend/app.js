const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const feedRoutes = require("./routes/feed");

//CORS
const corsOptions = {
  origin: "http://localhost:5173", // solo permite peticiones desde este origen
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // para que legacy browsers no fallen en preflight
};

app.use(cors(corsOptions)); // usa CORS en todas las rutas

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
  const errores = Array.isArray(error.errorDetails) ? error.errorDetails : [];

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
