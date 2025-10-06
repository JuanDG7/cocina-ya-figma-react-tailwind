const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const feedControllers = require("../controllers/recipe");
const { upload } = require("../middleware/upload");

const createRecipeValidators = [
  body("titulo").trim().notEmpty().withMessage("título es requerido"),
  body("calorias")
    .trim()
    .notEmpty()
    .withMessage("calorias es requerido")
    .bail()
    .customSanitizer((v) =>
      String(v)
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    )
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage("calorias ≥ 0"),

  body("tiempoMin")
    .customSanitizer((v) => (v === "" ? undefined : v)) // "" -> undefined, "0" se mantiene
    .optional() // ignora undefined y si queres ignorar tambien null-->{ nullable: true }
    .customSanitizer((v) => String(v).replace(/[^\d]/g, "")) // limpia todo lo que no sean dígitos
    .toInt() // convierte a número entero
    .isInt({ min: 0 })
    .withMessage("tiempoMin ≥ 0"), // valida que sea entero >= 0
  body("porciones")
    .optional()
    .customSanitizer((v) => String(v).replace(/[^\d]/g, "")) // ← nuevo
    .toInt()
    .isInt({ min: 1, max: 100 })
    .withMessage("porciones 1–100"),
];

//GET /feed/posts  //listar
router.get("/posts", feedControllers.getPosts);

//POST /feed/post   //crear
router.post(
  "/post",
  upload.single("photo"),
  createRecipeValidators,
  feedControllers.createPost
);

//GET /feed/post/:recipeId   //listar 1
router.get("/post/:recipeId", feedControllers.getPost);
module.exports = router;
