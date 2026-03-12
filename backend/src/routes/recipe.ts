import { Router } from "express";

import * as recipeController from "../controllers/recipe";
import upload from "../middleware/upload";
import isAuth from "../middleware/is-auth";
import { validate } from "../middleware/validate";
import { createRecipeSchema, updateRecipeSchema } from "../schemas/recipe";

const router = Router();

//GET /recipe/recipes  //listar todas las recetas
router.get("/recipes", isAuth, recipeController.getRecipes);

// GET /recipe/my-recipes //listar 1 receta
router.get("/my-recipes", isAuth, recipeController.getMyRecipes);

//POST /recipe   //crear
router.post(
  "",
  isAuth,
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "stepPhotos[]", maxCount: 20 },
  ]),

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
  validate(updateRecipeSchema),
  recipeController.updateRecipe
);

// DELETE /recipe/recipe/:recipeId
router.delete("/:recipeId", isAuth, recipeController.deleteRecipe);

export default router;
