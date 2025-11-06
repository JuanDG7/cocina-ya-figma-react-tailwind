import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

// ✅ Extiende Request para agregar userId
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

interface JwtPayload {
  email: string;
  userId: string;
  iat: number; //lo crea solo cuando haces jwt.sign() en el controller, issued at... es la hora que se creo el token
  exp: number; // expiration time, tambien lo agrega solo, al usar, {expiresIn:"1h"}
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    console.log("⚠️ No se envió header Authorization");
    const error = new Error("Not Authenticated.") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error; // ❌ corta el flujo y lo maneja el middleware global de errores
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  ("");
  console.log("🪶 Token recibido:", token);
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (err) {
    const error = err as Error & { statusCode?: number };
    error.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId; //esto es string... el decodedToken.userId pq en el jwt.sign solo guarda string
  next();
};
