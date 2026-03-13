import { Router } from "express";
import upload from "../middleware/upload";
import * as authController from "../controllers/auth";
import { validate } from "../middleware/validate";
import { loginSchema, signUpSchema } from "../schemas/auth";

const router = Router();

//crear usuario
router.put(
  "/signup",
  upload.none(),
  validate(signUpSchema),
  authController.signUp
);

//Login /auth/login
router.post("/login", validate(loginSchema), authController.login);

export default router;
