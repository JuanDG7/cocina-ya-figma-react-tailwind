import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error("Error de validacion") as Error & {
        statusCode?: number;
        data?: unknown;
      };
      error.statusCode = 422;
      error.data = result.error.issues;
      return next(error);
    }
    req.body = result.data;
    next();
  };
};
