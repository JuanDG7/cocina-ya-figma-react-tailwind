const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RecipeSchema = new Schema(
  {
    // Título obligatorio
    titulo: { type: String, trim: true, required: true },
    calorias: { type: Number, required: true, min: 0 },

    // Tiempo total en minutos (Number)
    tiempoMin: { type: Number, required: true, min: 0 },

    // Porciones (Number entero)
    porciones: { type: Number, required: true, min: 1 },

    // Descripción opcional
    descripcion: { type: String, trim: true, default: "" },
    //Categoria
    categoria: { type: String, trim: true, default: "" },

    // Consejo extra (opcional)
    consejos: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, required: true },

    //Ingredientes de la receta
    ingredients: [
      {
        name: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    //Steps
    steps: [
      {
        text: { type: String, required: false },
        photos: [{ type: String, required: false }],
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Evita redefinir el modelo en entornos con hot-reload
module.exports = model("Recipe", RecipeSchema);
