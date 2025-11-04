export type Recipe = {
  _id: string;
  titulo: string;
  calorias: number;
  tiempoMin: number;
  porciones: number;
  descripcion?: string;
  categoria?: string;
  consejos?: string;
  imageUrl: string;
  ingredients: { _id?: string; name: string; amount: string }[];
  steps: { _id?: string; text: string; photos: string[] }[];
  creator: { _id: string; email: string };
  createdAt: string;
  updatedAt: string;
};
