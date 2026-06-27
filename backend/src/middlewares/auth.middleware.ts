import { NextFunction, Request, Response } from "express";

import authRepository from "../modules/auth/repositories/auth.repository.js";
import { verifyAccessToken } from "../utils/jwt.js";

import UnauthorizedError from "../errors/UnauthorizedError.js";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError("Authorization header missing.");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      throw new UnauthorizedError("Invalid authorization type.");
    }

    const payload = verifyAccessToken(token);

    const user = await authRepository.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}