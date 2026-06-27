import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
  userId: string;
  email: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    issuer: env.APP_NAME,
    audience: "skoelx-api",
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET, {
    issuer: env.APP_NAME,
    audience: "skoelx-api",
  }) as JwtPayload;
}