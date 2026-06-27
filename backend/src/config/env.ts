import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().default(5000),

  APP_NAME: z.string().default("Skoelx"),

  APP_URL: z.string().default("http://localhost:5000"),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("1d"),

  LOG_LEVEL: z.string().default("info"),

  CORS_ORIGIN: z.string().default("http://localhost:5173"),

  LICENSE_PRIVATE_KEY: z.string().optional(),

  LICENSE_PUBLIC_KEY: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;