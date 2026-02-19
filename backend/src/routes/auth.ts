import { Router } from "express";
import { body } from "express-validator";
import upload from "../middleware/upload";
import User from "../models/user";
import * as authController from "../controllers/auth";
import type { IUser } from "../models/user";

const router = Router();

//crear usuario
router.put(
  "/signup",
  upload.none(),
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .notEmpty()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc: IUser | null) => {
          console.log("🧪 Probando búsqueda sin filtro:", userDoc);
          if (userDoc) {
            return Promise.reject("Este email ya existe en la base de datos");
          }
        });
      }),
    body("password").trim().isLength({ min: 3 }),
    // body("name").trim().not().isEmpty(),
  ],
  authController.signUp
);

//Login /auth/login
router.post("/login", authController.login);

export default router;
