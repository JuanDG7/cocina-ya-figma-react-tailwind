import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/user";
dotenv.config();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed") as Error & {
        statusCode?: number;
        data?: unknown;
      };
      error.statusCode = 422;
      error.data = errors.array();
      return next(error); // ✅ no rompe el flujo, pasa al manejador global
    }
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const status = req.body.status;

    const hashedPw = await bcryptjs.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      status: status,
    });
    const result = await user.save();

    res.status(201).json({
      message: "User created!",
      userId: result._id,
    });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;

  try {
    const user = (await User.findOne({ email: email })) as IUser | null;

    if (!user) {
      const error = new Error(
        "A user with this email could not be found."
      ) as Error & { statusCode?: number };
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcryptjs.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!") as Error & {
        statusCode?: number;
      };
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email, //
        userId: user._id.toString(), //aca lo convierte a String aunque no hacia falta el .toString()
      }, // es un overKILL
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: user._id.toString(),
    });
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
};
