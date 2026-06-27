import { Request, Response, NextFunction } from "express";

import ApiKeyService from "../modules/api-keys/services/api-key.service.js";

const service = new ApiKeyService();

export async function apiKeyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const apiKey =
      req.header("x-api-key");

    const apiSecret =
      req.header("x-api-secret");

    if (!apiKey || !apiSecret) {
      throw new Error(
        "Missing API credentials."
      );
    }

    await service.validate(
      apiKey,
      apiSecret
    );

    next();
  } catch (error) {
    next(error);
  }
}