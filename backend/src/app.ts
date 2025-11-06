import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import recipeRoutes from "./routes/recipe";
import authRoutes from "./routes/auth";
import type { Request, Response, NextFunction } from "express";
dotenv.config();
const app = express();

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
app.use("/images", express.static(path.join(__dirname, "..", "images")));

//ROUTES
app.use("/recipe", recipeRoutes);
app.use("/auth", authRoutes);

//MIDDLEWARE ERROR
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  console.log(
    "📤 Respuesta enviada al frontend desde el MIDDLEWARE GLOBAL DE ERRORES:",
    {
      status,
      message,
      data: data,
    }
  );
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(process.env.MONGODB_URI as string).then((result) => {
  app.listen(8080);
  console.log("Connected to database!");
});
