import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
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