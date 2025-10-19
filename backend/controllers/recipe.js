const { validationResult } = require("express-validator");
const Recipe = require("../models/recipe");
const fs = require("fs");
const path = require("path");

const User = require("../models/user");

//ALL Recipes (con paginación)
exports.getRecipes = async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
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
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

//CREATE Recipe
exports.createRecipe = async (req, res, next) => {
  console.log("📩 Req Body:", req.body);
  console.log("📷 Req Files:", req.files);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validacion fallo, data incorrecta");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error); // ✅ no rompe el flujo, pasa al manejador global
  }

  // ✅ 1) Foto principal (mainPhoto)
  const mainPhoto = req.files?.mainPhoto?.[0]?.path || null;

  // si no llegó, responde 422 (tu schema exige imageUrl)
  // if (!mainPhoto) {
  //   return res
  //     .status(422)
  //     .json({ erroresBack: ["Falta la foto principal (mainPhoto)"] });
  // }

  // 🚨 Si no llegó la imagen principal
  if (!mainPhoto) {
    const error = new Error("Falta la foto principal (mainPhoto)");
    error.statusCode = 422;
    return next(error); // ✅ Envía al middleware global de errores
  }

  const titulo = req.body.titulo;
  const calorias = req.body.calorias;
  const tiempoMin = req.body.tiempoMin;
  const porciones = req.body.porciones;
  const descripcion = req.body.descripcion;
  const categoria = req.body.categoria;
  const consejos = req.body.consejos;
  const imageUrl = mainPhoto;

  // arrays (normalizados)
  const stepText = Array.isArray(req.body.stepText)
    ? req.body.stepText
    : req.body.stepText
    ? [req.body.stepText]
    : [];

  const ingredientsName = Array.isArray(req.body.ingredientsName)
    ? req.body.ingredientsName
    : req.body.ingredientsName
    ? [req.body.ingredientsName]
    : [];
  const ingredientsAmount = Array.isArray(req.body.ingredientsAmount)
    ? req.body.ingredientsAmount
    : req.body.ingredientsAmount
    ? [req.body.ingredientsAmount]
    : [];

  // ingredientes
  if (ingredientsName.length !== ingredientsAmount.length) {
    return res.status(422).json({ erroresBack: "ingredientes desalineados" });
  }
  const ingredients = ingredientsName
    .map((name, index) => ({
      name: String(name).trim(),
      amount: String(ingredientsAmount[index] || "").trim(),
    }))
    .filter((x) => x.name || x.amount);

  // 🪄 6) Armar pasos por índice (1 foto por paso)
  const stepPhotos = req.files?.["stepPhotos[]"] || [];
  const steps = stepText.map((text, i) => ({
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
    imageUrl: imageUrl,
    ingredients,
    steps,
    creator: req.userId, //esto es un string pero mongoose al llevarlo a su bd lo convierto a un ObjectId
  });

  try {
    await recipe.save();
    const user = await User.findById(req.userId);
    user.recipes.push(recipe);
    await user.save();
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: recipe,
      creator: { _id: user._id, email: user.email },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET 1 SINGLE Recipe
exports.getRecipe = async (req, res, next) => {
  const requestId = req.params.recipeId;

  try {
    const recipe = await Recipe.findById(requestId);
    if (!recipe) {
      const error = new Error("Receta no encontrada! en exports.getRecipe");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "receta encontrada", recipe: recipe });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//PUT EDITAR 1 Recipe
exports.updateRecipe = async (req, res, next) => {
  console.log("📩 BODY:", req.body);
  console.log("📷 FILES:", req.files);

  const recipeId = req.params.recipeId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validación falló, datos incorrectos");
    error.statusCode = 422;
    error.errorDetails = errors.array();
    return next(error);
  }

  // 📸 Foto principal nueva o existente
  let mainPhoto = req.files?.mainPhoto?.[0]?.path || req.body.imageUrl;
  if (mainPhoto) mainPhoto = mainPhoto.replace(/\\/g, "/");

  // 🥣 INGREDIENTES
  const ingredientsName = Array.isArray(req.body.ingredientsName)
    ? req.body.ingredientsName
    : req.body.ingredientsName
    ? [req.body.ingredientsName]
    : [];

  const ingredientsAmount = Array.isArray(req.body.ingredientsAmount)
    ? req.body.ingredientsAmount
    : req.body.ingredientsAmount
    ? [req.body.ingredientsAmount]
    : [];

  const ingredients = ingredientsName
    .map((name, index) => ({
      name: String(name).trim(),
      amount: String(ingredientsAmount[index] || "").trim(),
    }))
    .filter((x) => x.name || x.amount);

  // 🧩 STEPS (coherente con createRecipe)
  const stepTexts = Array.isArray(req.body.stepText)
    ? req.body.stepText
    : req.body.stepText
    ? [req.body.stepText]
    : [];

  const existingStepPhotos = Array.isArray(req.body.existingStepPhotos)
    ? req.body.existingStepPhotos
    : req.body.existingStepPhotos
    ? [req.body.existingStepPhotos]
    : [];

  const stepPhotos = req.files?.["stepPhotos[]"] || [];

  const steps = stepTexts.map((text, i) => {
    const oldPath = existingStepPhotos[i];
    const newFile = stepPhotos[i];
    const photoPath = newFile
      ? newFile.path.replace(/\\/g, "/")
      : oldPath || null;

    if (newFile && oldPath && oldPath !== photoPath) {
      clearImage(oldPath);
    }

    return {
      text: String(text || "").trim(),
      photos: photoPath ? [photoPath] : [],
    };
  });

  // 🧱 Campos principales
  const {
    titulo,
    calorias,
    tiempoMin,
    porciones,
    descripcion,
    categoria,
    consejos,
  } = req.body;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    const error = new Error("Receta no encontrada");
    error.statusCode = 404;
    throw error;
  }
  if (recipe.creator.toString() !== req.userId) {
    const error = new Error("Not authorized!");
    error.statusCode = 403;
    throw error;
  }

  // 🧹 Si reemplazó la foto principal
  if (
    req.files?.mainPhoto &&
    recipe.imageUrl &&
    recipe.imageUrl !== mainPhoto
  ) {
    clearImage(recipe.imageUrl);
  }
  // 🧠 Actualizar campos
  recipe.titulo = titulo;
  recipe.calorias = calorias;
  recipe.tiempoMin = tiempoMin;
  recipe.porciones = porciones;
  recipe.descripcion = descripcion;
  recipe.categoria = categoria;
  recipe.consejos = consejos;
  recipe.imageUrl = mainPhoto;
  recipe.ingredients = ingredients;
  recipe.steps = steps;

  await recipe.save();

  console.log("✅ Receta actualizada correctamente");
  res.status(200).json({
    message: "Receta actualizada correctamente",
    recipe,
  });
};

//DELETE Recipe
exports.deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new Error(
        "Could not find recipe. from exports.deleteRecipe"
      );
      error.statusCode = 404;
      throw error;
    }

    if (recipe.creator.toString() !== req.userId) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }
    //Check logged in user
    clearImage(recipe.imageUrl);
    await Recipe.findByIdAndDelete(recipeId);
    const user = await User.findById(req.userId);
    user.recipes.pull(recipeId);
    await user.save();
    res.status(200).json({ message: "Deleted recipe." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  fs.unlink(fullPath, (err) => console.log("🗑️ Error al borrar imagen:", err));
};
