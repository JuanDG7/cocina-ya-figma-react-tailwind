const { validationResult } = require("express-validator");
const Recipe = require("../model/recipe");

//ALL POSTS
exports.getPosts = (req, res, next) => {
  res.status(200).json([
    {
      id: "pasta-alfredo",
      title: "Pasta Alfredoaaa cremosa",
      img: "/img/recipes/carbonara3x.webp",
      calorias: "152 kcal",
      time: "25 min",
      rating: 4.7,
    },
    {
      id: "burger",
      title: "Hamburguesa casera",
      img: "/img/recipes/gyozas.webp",
      calorias: "750 kcal",
      time: "18 min",
      rating: 4.5,
    },
    {
      id: "ramen",
      title: "Ramen express",
      img: "/img/recipes/pizza-pepperoni.webp",
      calorias: "1205 kcal",
      time: "30 min",
      rating: 4.6,
    },
  ]);
};

//CRAETE POST
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validacion fallo, data incorrecta");
    error.statusCode = 422;
    error.errorDetails = errors.array();
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  console.log(req.body);
  const imageUrl = req.file.path;
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
    imageUrl,

    ingredients,
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
