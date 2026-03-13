import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .email("Please enter a valid email")
      .transform((value) => value.toLowerCase()),

    password: z.string().trim().min(4, "Minimo 4 caracteres para el password"),
    confirmPassword: z.string().trim().min(1, "Debes confirmar la contraseña"),

    status: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .email("Email invalido")
    .transform((value) => value.trim().toLowerCase()),

  password: z.string().trim().min(1, "El password es obligatorio"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
