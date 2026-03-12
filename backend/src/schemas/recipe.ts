import { z } from "zod";

export const createRecipeSchema = z
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

    stepText: z.preprocess((value) => {
      if (Array.isArray(value)) return value;
      if (value === undefined || value === null || value === "") return [];
      return [value];
    }, z.array(z.string().trim()).min(1, "Debe incluir al menos 1 paso")),

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
