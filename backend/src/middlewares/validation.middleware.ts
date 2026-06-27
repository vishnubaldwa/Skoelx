import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: AnyZodObject) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
}