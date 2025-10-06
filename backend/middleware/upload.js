const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const imagesDir = path.join(__dirname, "..", "images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // extensión (incluye el punto)
    const baseName = path.basename(file.originalname, ext); // nombre sin extensión
    const safeName = baseName.replace(/\s+/g, "_"); // reemplaza espacios por _
    cb(null, `${safeName}_${uuidv4()}${ext}`); // ej: foto_123e4567-e89b-12d3-a456-426614174000.jpg
  },
});

const fileFilter = (req, file, cb) => {
  const ok = /image\/(png|jpe?g|webp|gif)/.test(file.mimetype);
  if (!ok) return cb(new Error("Tipo de archivo no permitido"), false);
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
module.exports = { upload }; // ←  aqui esta wrapeando en un objeto, y luego en la importacion hace desestructuracion quak!
