const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const recipeController = require("../controllers/recipe");
const upload = require("../middleware/upload");
const isAuth = require("../middleware/is-auth");
const createRecipeValidators = [
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("título es requerido")
    .isLength({ min: 3, max: 100 })
    .withMessage("El titulo debe tener 3 y 100 caracteres"),
  body("calorias")
    .trim()
    .notEmpty()
    .withMessage("las calorias son obligatorias")
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
  body("stepText")
    .isArray()
    .withMessage("Los pasos deben ser un array")
    .custom((arr) => arr.length > 0)
    .withMessage("Debe incluir al menos un paso"),
];

//GET /recipe/recipes  //listar
router.get("/recipes", isAuth, recipeController.getRecipes);

//POST /recipe/recipe   //crear
router.post(
  "",
  isAuth,
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "stepPhotos[]", maxCount: 20 },
  ]),
  // createRecipeValidators,
  recipeController.createRecipe
);

//GET /recipe/recipe/:recipeId   //listar 1
router.get("/:recipeId", isAuth, recipeController.getRecipe);

// PUT /recipe/recipe/:recipeId/edit

router.put(
  "/:recipeId",
  isAuth,
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "stepPhotos[]", maxCount: 20 },
  ]),
  recipeController.updateRecipe
);

// DELETE /recipe/recipe/:recipeId
router.delete("/:recipeId", isAuth, recipeController.deleteRecipe);
module.exports = router;
