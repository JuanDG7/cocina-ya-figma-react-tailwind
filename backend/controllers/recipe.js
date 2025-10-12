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

  // ✅ 1) Foto principal (mainPhoto)
  const mainPhoto = req.files?.mainPhoto?.[0]?.path || null;
  const stepPhotos = req.files?.["stepPhotos[]"] || [];

  // si no llegó, responde 422 (tu schema exige imageUrl)
  if (!mainPhoto) {
    return res
      .status(422)
      .json({ erroresBack: ["Falta la foto principal (mainPhoto)"] });
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
