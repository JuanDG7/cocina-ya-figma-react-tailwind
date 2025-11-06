import mongoose from "mongoose";

export interface IIngredient {
  name: string;
  amount: string;
}

export interface IStep {
  text: string;
  photos: string[];
}

export interface IRecipe extends mongoose.Document {
  titulo: string;
  calorias: number;
  tiempoMin: number;
  porciones: number;
  descripcion?: string;
  categoria?: string;
  consejos?: string;
  imageUrl: string;
  ingredients: IIngredient[];
  steps: IStep[];
  creator: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
const RecipeSchema = new mongoose.Schema<IRecipe>(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Evita redefinir el modelo en entornos con hot-reload
export default mongoose.model<IRecipe>("Recipe", RecipeSchema);
