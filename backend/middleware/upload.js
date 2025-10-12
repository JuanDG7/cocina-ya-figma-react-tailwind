const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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
const fileFilter = (req, file, cb) => {
  const ok = /image\/(png|jpe?g|webp)/.test(file.mimetype);
  cb(null, ok);
};

// ⚙️ Configuración principal
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // límite de 5MB
});

module.exports = upload;
