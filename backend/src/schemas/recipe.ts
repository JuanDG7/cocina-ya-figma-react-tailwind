import { z } from "zod";

export const createRecipeSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(3, "El titulo debe tener al menos 3 caracteres")
      .max(100, "El titulo debe tener maximo 100 caracteres"),

    calorias: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Las calorias son obligatorias"
              : "Las calorias deben ser un numero",
        })
        .min(0, "Las calorias deben ser 0 o mayores")
    ),

    tiempoMin: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "El tiempo es obligatorio"
              : "El tiempo debe ser un numero",
        })
        .min(0, "El tiempo debe ser 0 o mayor")
    ),

    porciones: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Las porciones son obligatorias"
              : "Las porciones deben ser un numero",
        })
        .min(1, "Las porciones minimas son 1")
        .max(100, "Las porciones maximas son 100")
    ),

    descripcion: z.string().optional(),
    categoria: z.string().optional(),
    consejos: z.string().optional(),

    stepText: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim()).min(1, "El paso no puede estar vacio").min(1, "Debe incluir al menos 1 paso")),

    ingredientsName: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim().min(1, "El nombre del ingrediente es obligatorio")).min(1, "Debe agregar al menos 1 ingrediente")),

    ingredientsAmount: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim().min(1, "La cantidad del ingrediente es obligatoria")).min(1, "Debe agregar al menos 1 ingrediente")),
  })
  .refine(
    (data) => data.ingredientsName.length === data.ingredientsAmount.length,
    {
      message: "Los nombres y cantidades no coinciden",
      path: ["ingredientsName"],
    }
  );

export const updateRecipeSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(3, "El titulo debe tener al menos 3 caracteres")
      .max(100, "El titulo debe tener maximo 100 caracteres"),

    calorias: z.coerce.number().min(0, "calorias mayor a 0"),

    tiempoMin: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().min(0, "tiempoMin mayor a 0").optional()
    ),

    porciones: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number()
        .min(1, "porciones minimas es 1")
        .max(100, "porciones maximas es 100")
        .optional()
    ),

    descripcion: z.string().optional(),
    categoria: z.string().optional(),
    consejos: z.string().optional(),
    imageUrl: z.string().optional(),

    stepText: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim()).min(1, "Debe incluir al menos 1 paso")),

    photoId: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim())),

    existingStepPhotos: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim())),

    hasNewPhoto: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim())),

    ingredientsName: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim())),

    ingredientsAmount: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim())),
  })
  .refine(
    (data) => data.ingredientsName.length === data.ingredientsAmount.length,
    {
      message: "Los nombres y cantidades no coinciden",
      path: ["ingredientsName"],
    }
  );

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
