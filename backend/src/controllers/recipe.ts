import {
  CreateRecipeInput,
  createRecipeSchema,
  UpdateRecipeInput,
} from "../schemas/recipe";
import Recipe from "../models/recipe";
import fs from "fs";
import path from "path";
import User from "../models/user";
import type { Request, Response, NextFunction } from "express";

import { Types } from "mongoose";

const clearImage = (filePath?: string) => {
  if (!filePath) return;
  const fullPath = path.join(
    __dirname,
    "..",
    "..",
    filePath.replace(/\\/g, "/")
  );
  fs.unlink(fullPath, (err) => {
    if (err) {
      // Si el archivo no existe, no es grave
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
      console.error("🗑️ Error al borrar imagen:", err.message);
      return;
    }
    console.log("🗑️ Imagen borrada correctamente:", fullPath);
  });
};

// ✅ BORRAR ARCHIVOS SUBIDOS SI FALLA LA VALIDACIÓN (422)
const cleanupUploadedFiles = (files: any) => {
  Object.values(files || {})
    .flat()
    .forEach((f: any) => {
      if (f && f.path) clearImage(f.path);
    });
};

//ALL Recipes (con paginación)
export const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = parseInt(req.query.page as string) || 1;
  const perPage = 2; // 🔧 cantidad de recetas por página

  try {
    const totalItems = await Recipe.countDocuments();
    const recipes = await Recipe.find()
      .populate("creator")
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Fetched recipes successfully.",
      recipes,
      totalItems,
    });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
//My Recipes
export const getMyRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      const error = new Error(
        "No se encontró el usuario autenticado."
      ) as Error & { statusCode?: number };
      error.statusCode = 401;
      throw error;
    }

    // 🔸 Paginación
    const currentPage = parseInt(req.query.page as string) || 1;
    const perPage = 2;

    // 🔸 Contar total de recetas del usuario
    const totalItems = await Recipe.countDocuments({ creator: userId });

    // 🔸 Traer recetas del usuario con paginación
    const recipes = await Recipe.find({ creator: userId })
      .populate("creator", "email") // opcional
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Recetas del usuario obtenidas correctamente.",
      recipes,
      totalItems,
    });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) error.statusCode = 500;
    next(err);
  }
};

//CREATE Recipe
export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("📩 Req Body:", req.body);
  console.log("📷 Req Files:", req.files);

  const result = createRecipeSchema.safeParse(req.body);
  if (!result.success) {
    cleanupUploadedFiles(req.files);
    const error = new Error("Validacion fallo, datos incorrectos") as Error & {
      statusCode?: number;
      data?: unknown;
    };
    error.statusCode = 422;
    error.data = result.error.issues;
    return next(error);
  }
  const body: CreateRecipeInput = result.data;
  type MulterFiles = {
    mainPhoto?: Express.Multer.File[];
    "stepPhotos[]"?: Express.Multer.File[];
  };

  const files = req.files as MulterFiles;

  // ✅ 1) Foto principal (mainPhoto)
  const mainPhoto = files?.mainPhoto?.[0];

  if (!mainPhoto) {
    cleanupUploadedFiles(req.files);
    const error = new Error("Falta la foto principal (mainPhoto)") as Error & {
      statusCode?: number;
      data?: { msg: string }[];
    };
    error.statusCode = 422;
    error.data = [{ msg: "Falta la foto principal (mainPhoto)" }];
    return next(error); // ✅ Envía al middleware global de errores
  }

  const imageUrl = `images/${mainPhoto.filename}`;

  // si no llegó, responde 422 (tu schema exige imageUrl)
  // if (!mainPhoto) {
  //   return res
  //     .status(422)
  //     .json({ erroresBack: ["Falta la foto principal (mainPhoto)"] });
  // }

  // 🚨 Si no llegó la imagen principal

  const titulo = body.titulo;
  const calorias = body.calorias;
  const tiempoMin = body.tiempoMin;
  const porciones = body.porciones;
  const descripcion = body.descripcion;
  const categoria = body.categoria;
  const consejos = body.consejos;
  const stepText = body.stepText;
  const ingredientsName = body.ingredientsName;
  const ingredientsAmount = body.ingredientsAmount;

  const ingredients = ingredientsName.map((name: string, index: number) => ({
    name: String(name).trim(),
    amount: String(ingredientsAmount[index] || "").trim(),
  }));

  // 🪄 6) Armar pasos por índice (1 foto por paso)
  const stepPhotos = files?.["stepPhotos[]"] || [];
  const steps = stepText.map((text: string, i: number) => ({
    text: String(text || "").trim(),
    photos: stepPhotos[i] ? [stepPhotos[i].path] : [],
  }));

  console.log(steps);
  const recipe = new Recipe({
    titulo,
    calorias,
    tiempoMin,
    porciones,
    descripcion,
    categoria,
    consejos,
    imageUrl,
    ingredients,
    steps,
    creator: req.userId, //esto es un string pero mongoose al llevarlo a su bd lo convierto a un ObjectId
  });

  try {
    await recipe.save();
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }
    user.recipes.push(recipe._id as Types.ObjectId);
    await user.save();
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: recipe,
      creator: { _id: user._id, email: user.email },
    });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
};

// GET 1 SINGLE Recipe
export const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.params.recipeId;

  try {
    const recipe = await Recipe.findById(requestId);
    if (!recipe) {
      const error = new Error(
        "Receta no encontrada! en exports.getRecipe"
      ) as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "receta encontrada", recipe: recipe });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
};

//Update Recipe
export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("📩 BODY:", req.body);
  console.log("📷 FILES:", req.files);

  const recipeId = req.params.recipeId;
  const body: UpdateRecipeInput = req.body;

  type MulterFiles = {
    mainPhoto?: Express.Multer.File[];
    "stepPhotos[]"?: Express.Multer.File[];
  };

  const files = req.files as MulterFiles;

  // 📸 FOTO PRINCIPAL NUEVA O EXISTENTE
  let mainPhoto = files?.mainPhoto?.[0]?.path || body.imageUrl || "";
  if (mainPhoto) mainPhoto = mainPhoto.replace(/\\/g, "/");

  // 🥣 INGREDIENTES
  const ingredientsName = body.ingredientsName;

  const ingredientsAmount = body.ingredientsAmount;

  const ingredients = ingredientsName
    .map((name: string, index: number) => ({
      name: String(name).trim(),
      amount: String(ingredientsAmount[index] || "").trim(),
    }))
    .filter((x: { name: string; amount: string }) => x.name || x.amount);

  // 🧱 BUSCAR RECETA
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    const error = new Error("Receta no encontrada") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  if (recipe.creator.toString() !== req.userId) {
    const error = new Error("Not authorized!") as Error & {
      statusCode?: number;
    };
    error.statusCode = 403;
    throw error;
  }

  // 🧩 === LÓGICA DE PASOS ACTUALIZADA ===
  const stepTexts = body.stepText;
  const stepIds = body.photoId;
  const existingStepPhotos = body.existingStepPhotos;
  const hasNewPhotos = body.hasNewPhoto;

  const stepFiles = files?.["stepPhotos[]"] || [];

  let fileIndex = 0;
  const updatedSteps = [];

  for (let i = 0; i < stepIds.length; i++) {
    const text = stepTexts[i] ? String(stepTexts[i]).trim() : "";
    const oldPath = existingStepPhotos[i]
      ? String(existingStepPhotos[i]).replace(/\\/g, "/")
      : "";
    const newFlag = hasNewPhotos[i] === "true";

    let finalPhoto = oldPath;

    // 📸 Solo reemplazar si el usuario subió nueva imagen
    if (newFlag && stepFiles[fileIndex]) {
      finalPhoto = stepFiles[fileIndex].path.replace(/\\/g, "/");
      fileIndex++;
      if (oldPath && oldPath !== finalPhoto) clearImage(oldPath);
    }

    // ⛔ Omitir pasos vacíos (borrados)
    if (!text && !finalPhoto) continue;

    updatedSteps.push({
      text,
      photos: finalPhoto ? [finalPhoto] : [],
    });
  }

  // 🧹 BORRAR FOTO PRINCIPAL SI SE REEMPLAZÓ
  if (files?.mainPhoto && recipe.imageUrl && recipe.imageUrl !== mainPhoto) {
    clearImage(String(recipe.imageUrl).replace(/\\/g, "/"));
  }

  // 🧠 ACTUALIZAR CAMPOS
  const {
    titulo,
    calorias,
    tiempoMin,
    porciones,
    descripcion,
    categoria,
    consejos,
  } = req.body;
  recipe.titulo = titulo;
  recipe.calorias = calorias;
  recipe.tiempoMin = tiempoMin;
  recipe.porciones = porciones;
  recipe.descripcion = descripcion;
  recipe.categoria = categoria;
  recipe.consejos = consejos;
  recipe.imageUrl = mainPhoto;
  recipe.ingredients = ingredients;

  // 🔒 Guardamos referencia de las fotos anteriores para limpiar las que ya no queden
  const previousPhotos = new Set<string>();

  (recipe.steps || []).forEach((s) =>
    (s.photos || []).forEach((p) =>
      previousPhotos.add(String(p).replace(/\\/g, "/"))
    )
  );

  recipe.steps = updatedSteps;

  // ✅ LIMPIEZA: borrar cualquier foto que estaba antes y ya NO está en los pasos nuevos
  const keptPhotos = new Set<string>();

  updatedSteps.forEach((s) =>
    (s.photos || []).forEach((p) =>
      keptPhotos.add(String(p).replace(/\\/g, "/"))
    )
  );

  previousPhotos.forEach((p) => {
    if (!keptPhotos.has(p)) {
      clearImage(p);
    }
  });

  await recipe.save();

  console.log("✅ Receta actualizada correctamente");
  res.status(200).json({
    message: "Receta actualizada correctamente",
    recipe,
  });
};

//DELETE Recipe
export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipeId = req.params.recipeId;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new Error(
        "Could not find recipe. from exports.deleteRecipe"
      ) as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }

    if (recipe.creator.toString() !== req.userId) {
      const error = new Error("Not authorized") as Error & {
        statusCode?: number;
      };
      error.statusCode = 403;
      throw error;
    }

    // 🧹 Borrar main photo
    if (recipe.imageUrl) {
      clearImage(recipe.imageUrl.replace(/\\/g, "/"));
    }

    // 🧹 Borrar todas las fotos de pasos
    (recipe.steps || []).forEach((step: { photos?: string[] }) => {
      (step.photos || []).forEach((p: string) => {
        if (p) clearImage(String(p).replace(/\\/g, "/"));
      });
    });

    await Recipe.findByIdAndDelete(recipeId);

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error(
        "Usuario no encontrado al eliminar receta"
      ) as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }

    /* BUENA PRACTICA!
    await User.updateOne({ _id: req.userId }, { $pull: { recipes: recipeId } });
*/
    (user.recipes as any).pull(recipeId);
    await user.save();

    res.status(200).json({ message: "Deleted recipe." });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) error.statusCode = 500;
    next(err);
  }
};
