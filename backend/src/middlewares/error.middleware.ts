import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import AppError from "../errors/AppError.js";
import logger from "../config/logger.js";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
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

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          requestId: req.requestId,
          message: "Duplicate record.",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          requestId: req.requestId,
          message: "Record not found.",
        });

      default:
        return res.status(500).json({
          success: false,
          requestId: req.requestId,
          message: "Database error.",
        });
    }
  }

  return res.status(500).json({
    success: false,
    requestId: req.requestId,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error instanceof Error
          ? error.message
          : "Unknown Error",
  });
}