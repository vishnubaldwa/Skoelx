import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import AppError from "../../errors/AppError.js";
import ApiResponse from "../responses/api.response.js";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return ApiResponse.error(
      res,
      err.message,
      err.statusCode
    );
  }

  if (err instanceof ZodError) {
    return ApiResponse.error(
      res,
      "Validation failed.",
      400,
      err.flatten()
    );
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError
  ) {
    switch (err.code) {
      case "P2002":
        return ApiResponse.error(
          res,
          "Duplicate record.",
          409
        );

      case "P2025":
        return ApiResponse.error(
          res,
          "Record not found.",
          404
        );

      default:
        return ApiResponse.error(
          res,
          "Database error.",
          500
        );
    }
  }

  console.error(err);

  return ApiResponse.error(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal server error."
      : err.message,
    500
  );
}