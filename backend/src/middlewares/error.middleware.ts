import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import AppError from "../errors/AppError.js";
import { logger } from "../config/logger.js";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({
    requestId: req.requestId,
    error,
  });

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      requestId: req.requestId,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      requestId: req.requestId,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    requestId: req.requestId,
    message: "Internal Server Error",
  });
}