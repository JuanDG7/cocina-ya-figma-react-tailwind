import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Request } from "express";

// 📦 Almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // guarda en /backend/images (ruta relativa)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg, .png, etc.
    const base = path.parse(file.originalname).name.replace(/\s+/g, "_"); // limpia espacios
    cb(null, `${base}_${uuidv4()}${ext}`); // mantiene nombre original + uuid
  },
});

// 🧩 Filtro de tipos permitidos
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const ok = /image\/(png|jpe?g|webp)/.test(file.mimetype);
  cb(null, ok);
};

// ⚙️ Configuración principal
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // límite de 5MB
});

export default upload;
