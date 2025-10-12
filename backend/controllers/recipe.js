const { validationResult } = require("express-validator");
const Recipe = require("../model/recipe");

//ALL POSTS
exports.getPosts = (req, res, next) => {
  Recipe.find()
    .then((recipe) => {
      console.log(recipe),
        res
          .status(200)
          .json({ message: "fetched post successfully.", recipes: recipe });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
//CRAETE POST
exports.createPost = (req, res, next) => {
  console.log("📩 Req Body:", req.body);
  console.log("📷 Req Files:", req.files);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validacion fallo, data incorrecta");
    error.statusCode = 422;
    error.errorDetails = errors.array();
    throw error;
  }

  console.log(req.body);

  const qq = req.files || [];

  // ✅ 1) Foto principal (mainPhoto)
  const mainPhoto = req.files?.mainPhoto?.[0] || null;

  // ⚠️ 2) 'photos' puede venir como undefined, objeto único o array (photos/photoStepId que viene como input hidden)
  let photosPath = [];
  if (Array.isArray(req.files?.photos)) {
    //es un array? si es array usar directamente
    photosPath = req.files.photos;
  } else if (req.files?.photos) {
    //si NO es un array, convertirlo en uno!
    photosPath = [req.files.photos]; // si vino solo una foto
  }

  // ✅ 3) IDs de pasos
  const rawPhotoStepId = req.body.photoStepId;
  const photoStepIds = Array.isArray(rawPhotoStepId)
    ? rawPhotoStepId
    : rawPhotoStepId
    ? [rawPhotoStepId]
    : [];

  // ✅ 4) Agrupar fotos por paso
  const stepPhotoMap = {};
  if (photosPath.length > 0 && photoStepIds.length > 0) {
    photosPath.forEach((file, index) => {
      const stepId = photoStepIds[index];
      if (!stepPhotoMap[stepId]) stepPhotoMap[stepId] = [];
      stepPhotoMap[stepId].push(file.path);
    });
  }

  const stepText = req.body.stepText;
  // ✅ 5) Crear pasos con sus fotos y textos
  const recipeSteps = photoStepIds.map((id, idx) => ({
    text: Array.isArray(stepText) ? stepText[idx] : stepText,
    photos: stepPhotoMap[id] || [],
  }));

  const titulo = req.body.titulo;
  const calorias = req.body.calorias;
  const tiempoMin = req.body.tiempoMin;
  const porciones = req.body.porciones;
  const descripcion = req.body.descripcion;
  const consejos = req.body.consejos;
  const ingredientsName = req.body.ingredientsName;
  const ingredientsAmount = req.body.ingredientsAmount;

  if (ingredientsName.length !== ingredientsAmount.length) {
    return res.status(422).json({ erroresBack: "ingredientes desalineados" });
  }

  const ingredients = ingredientsName
    .map((name, index) => {
      return {
        name: String(name).trim(),
        amount: ingredientsAmount[index].trim(),
      };
    })
    .filter((x) => x.name || x.amount);

  const recipe = new Recipe({
    titulo,
    calorias,
    tiempoMin,
    porciones,
    descripcion,
    consejos,
    imageUrl: mainPhoto ? mainPhoto.path : null,
    ingredients,
    steps: recipeSteps,
  });

  recipe
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully",
        recipe: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//SINGLE POST
exports.getPost = (req, res, next) => {
  const requestId = req.params.recipeId;
  Recipe.findById(requestId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error("Receta no encontrada! en exports.getPost");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "receta encontrada", recipe: recipe });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
